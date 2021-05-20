import { Component } from "../../core/Component";
import { ResourcesAPI } from "../../core/xhr/ResourcesAPI";
import * as actions from "../../core/store/actions";
import { TFile } from "../../core/store/stateTypes";
import { Store } from "../../core/store/Store";

export class ResourcesController {
   constructor(private component: Component) {}

   static getAttachedFile(): TFile | null {
      return Store.get().getState().fileAttachForm?.file || null;
   }

   async uploadFile(formData: FormData) {
      const { status, data } = await new ResourcesAPI().upload(formData);
      console.log("~ status, data", status, data);
      if (status === "success") {
         this.component.$dispatch(actions.fileAttachAddFile(data));
         this.component.$dispatch(actions.fileAttachOpenForm());
      }
   }
}
