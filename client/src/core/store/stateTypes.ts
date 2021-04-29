import { LeftSidebarViews } from "../../controllers/LeftSidebar/LeftSidebarViews";
import { TAccount } from "../../models/types";

export type TState = {
   title?: string;
   rightSidebar?: TRightSidebarState;
   leftSidebar?: TLeftSidebarState;
   chats?: TChatsState;
   accountSettings?: TAccountState;
   session?: { login?: string };
};

export type TRightSidebarState = {
   status?: "open" | "close";
   componentName?: string;
   login?: string;
};

export type TLeftSidebarState = {
   view?: LeftSidebarViews;
};

export type TAccountState = TAccount;

export type TSessionState = {
   login?: string | null;
};

export type TChatsState = {
   selectedChat?: any;
   chats?: [];
};
