import { $, TDomAbstraction } from "../utils/dom-abstraction";
import { Subscription, TEmmiter, getEmmiter } from "./Emmiter";

import { ComponentDOMListenrt } from "./ComponentDOMListener";
import { Templator } from "./templators/templator";
import { TemplatorProps } from "./templators/templator-props";
import { get } from "../utils/pure-functions";
import { isEmpty } from "../utils/isEmpty";
import { v4 as uuidv4 } from "uuid";

type TIngredients = {
   name: string;
   template?: string;
   components: TIngredients[];
   listeners?: string[];
   subscribers?: Object;
   props?: Object;
   methods?: Object;
   beforePrepare?: () => void;
   beforeCreate?: () => void;
   beforeMount?: () => void;
   beforeInit?: () => void;
   afterInit?: () => void;
   beforeUpdate?: () => void;
   beforeDestroy?: () => void;
};

type ComponentLifeCycleNames = {
   BEFORE_CREATE: string;
   BEFORE_MOUNT: string;
   BEFORE_INIT: string;
   AFTER_INIT: string;
   UPDATE: string;
   DESTROY: string;
};

export class Component extends ComponentDOMListenrt {
   EVENTS: ComponentLifeCycleNames;
   emmiter: TEmmiter;
   emmiterSubscriptions: Subscription[] = [];
   components: TIngredients[] = [];
   componentsInst: Component[] = [];
   template: string = "";
   subscribers?: Object;
   options?: TIngredients;
   props: any;
   id: string = uuidv4();

   constructor(
      private $targetEl: TDomAbstraction,
      options: TIngredients,
      public parentComponent: Component | null = null
   ) {
      super(options.listeners);
      if (isEmpty(options)) {
         throw new Error(`No options in Component`);
      }
      if (!options.name) {
         throw new Error(`No name defined in Component`);
      }
      this.name = options.name || (Component.name as string);
      this.components = options.components || [];
      this.template = options.template || "";
      this.props = options.props || {};
      this.subscribers = options.subscribers || {};

      this.initMethods(options);

      this.emmiter = getEmmiter();

      this.prepare();
   }

   private initMethods(options: TIngredients) {
      this.methods = options.methods || {};
      Object.getOwnPropertyNames(this.methods).forEach((key) => {
         Object.defineProperty(this, key, {
            configurable: false,
            writable: false,
            value: this.methods[key].bind(this),
         });
      });

      const BaseMethods = [
         "beforePrepare",
         "beforeCreate",
         "beforeMount",
         "beforeInit",
         "afterInit",
         "beforeUpdate",
         "beforeDestroy",
      ];

      BaseMethods.forEach((key) => {
         if (options[key]) {
            Object.defineProperty(this, key, {
               configurable: false,
               writable: false,
               value: options[key].bind(this),
            });
         }
      });
   }

   // get props from template
   // init LifeCycle events in Emmiter
   beforePrepare(): void {}
   private prepare(): void {
      this.getPropsFromTemplate();
      this.beforePrepare();
      this.initSubscribers();
      this.initEventsNames();
      this.initLifeCycleEvents();
      this.$emit(this.EVENTS.BEFORE_CREATE);
   }

   getPropsFromTemplate(): void {
      if (isEmpty(this.parentComponent)) return;
      if (!get(this.parentComponent, "props", false)) {
         this.props = {};
         return;
      }
      const templator = new TemplatorProps(this.$targetEl.html());
      this.props = {
         ...this.props,
         ...templator.compile(this.parentComponent.props),
      };
   }

   private initEventsNames(): void {
      const prefix = this.emmiter.contains(`${this.name}:beforeCreate`)
         ? `${this.name}_${this.id}`
         : this.name;

      this.EVENTS = {
         BEFORE_CREATE: `${prefix}:beforeCreate`,
         BEFORE_MOUNT: `${prefix}:beforeMount`,
         BEFORE_INIT: `${prefix}:beforeInit`,
         AFTER_INIT: `${prefix}:afterInit`,
         UPDATE: `${prefix}:update`,
         DESTROY: `${prefix}:destroy`,
      };
   }

   private initLifeCycleEvents(): void {
      this.$on(this.EVENTS.BEFORE_CREATE, this._beforeCreate.bind(this));
      this.$on(this.EVENTS.BEFORE_MOUNT, this._beforeMount.bind(this));
      this.$on(this.EVENTS.BEFORE_INIT, this._beforeInit.bind(this));
      this.$on(this.EVENTS.AFTER_INIT, this._afterInit.bind(this));
      this.$on(this.EVENTS.UPDATE, this._update.bind(this));
      this.$on(this.EVENTS.DESTROY, this._destroy.bind(this));
   }

   beforeCreate(): void {}
   private _beforeCreate(): void {
      this.beforeCreate();
      // CREATE: create $root
      this.initRoot();

      // RENDER all children components
      this.initChildren();

      this.$emit(this.EVENTS.BEFORE_MOUNT);
   }

   private initRoot(): void {
      const templateCompiled = this.compileTemplate(this.template);
      this.$root = this.buildDomAbstraction(templateCompiled);
   }

   private compileTemplate(template: string): string {
      if (isEmpty(template.trim())) {
         return "";
      }
      // const context = get(this.parentComponent, "props", {});
      const context = this.props;
      const templator = new Templator(template);
      return templator.compile(context).trim();
   }

   private buildDomAbstraction(template: string): TDomAbstraction {
      return $.create("template")
         .html(template as string)
         .firstChild() as TDomAbstraction;
   }

   private initChildren(): void {
      this.components.forEach((Ingredients: TIngredients) => {
         const $tags: TDomAbstraction[] = this.findAllTags(Ingredients.name);
         $tags.forEach(($targetEl) => {
            const component = new Component($targetEl, Ingredients, this);
            this.componentsInst.push(component);
         });
      });
   }

   private findAllTags(tagName: string): TDomAbstraction[] {
      return this.$root.findAll(tagName).map((el) => $(el));
   }

   beforeMount(): void {}
   private _beforeMount(): void {
      this.beforeMount();
      // MOUNT: replace $targetEl on $root
      if (!this.$root.isEmpty()) {
         this.$targetEl.parent().replaceChild(this.$root, this.$targetEl);
      } else {
         this.$targetEl.remove();
      }

      this.$emit(this.EVENTS.BEFORE_INIT);
   }

   beforeInit(): void {}
   private _beforeInit(): void {
      this.beforeInit();
      this.initDOMListeners();
      this.$emit(this.EVENTS.AFTER_INIT);
   }

   private initSubscribers(): void {
      Object.getOwnPropertyNames(this.subscribers).forEach((key: string) => {
         this.$on(key, this.subscribers[key].bind(this));
      });
   }

   afterInit(): void {}
   private _afterInit(): void {
      this.afterInit();
      console.log(this.name, this);
   }

   beforeUpdate(): void {}
   private _update(): void {
      this.beforeUpdate();
      // UPDATE: rereder
   }

   beforeDestroy(): void {}
   private _destroy(): void {
      this.beforeDestroy();
      // DESTROY: create $root
      this.removeDOMListeners();
      this.emmiterSubscriptions.forEach((sub) => sub.unsubscribe());
      this.$root.$el.remove();
   }

   render(): void {}

   _reRender(): void {}

   $emit(event: string, ...params: any): void {
      this.emmiter.emit(event, ...params);
   }

   $on(event: string, fn): void {
      const subscription = this.emmiter.subscribe(event, fn);
      this.emmiterSubscriptions.push(subscription);
   }

   $show(): void {
      this.$root.css({ opacity: 1 });
   }

   $hide(): void {
      this.$root.css({ opacity: 0 });
   }
}
