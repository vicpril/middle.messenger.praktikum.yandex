import "./InfoChat.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./InfoChat.tmpl";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";
import { ChatsController } from "../../../controllers/Chats/ChatsController";

export const InfoChat = {
   name: "InfoChat",
   template: template,
   components: [Avatar],
   props: {
      chat: {},
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "changeAvatar") {
            console.log(
               `Notifications from ${this.props.user.display_name} muted!`
            );
         } else if (e.target.dataset.action === "delete") {
            if (
               // eslint-disable-next-line no-restricted-globals
               confirm(
                  `Are you sure you want to delete the chat "${this.props.chat.title}?"`
               )
            ) {
               new ChatsController(this).delete(this.props.chat.id);
            }
         }
      },
   },
   beforePrepare() {
      this.props.chat = RightSidebarController.getChat();
   },
};
