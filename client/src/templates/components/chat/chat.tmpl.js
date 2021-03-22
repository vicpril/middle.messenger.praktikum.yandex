export default `
<div class="user__wrapper {{css}} 
    <v-if="is_current">
    user__active
    </v-if>
     ">
        {{avatar}}
        <div class="user__info">
            <span class="user__displayname">{{display_name}}</span>
            <span class="user__last_message">{{last_message}}</span>
        </div>
        <div class="user__actions">
            <v-if="is_account">
                {{btn_settings}}
            <v-else>
                <span class="last_message_date">{{last_message_date}}</span>
                <span class="unread_messages_counter">{{unread_count}}</span>
            </v-if>
        </div>

    </div>
`;