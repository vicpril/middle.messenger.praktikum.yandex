export default /* html */ `
<form class="info__section form__sign_up"
<v-if="action">    
    action="{{action}}"
</v-if>
<v-if="method">    
    method="{{method}}"
</v-if>
>
    <div class="info__content" >
      <h3>Sign In</h3>
        <v-for :field :index in fields><InputGroup bind:obj="fields[{{index}}]"></InputGroup></v-for>
    </div>
    
    <div class="info__actions">
    <button type="submit" class="button info__button button_primary" data-action="signup">Sign up</button>
    <a href="/signin.html">Back to Sign in</a>       
    </div>
</form>
`;
