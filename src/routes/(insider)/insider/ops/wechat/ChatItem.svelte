<script lang="ts">
  export let message: {
    name: string;
    sender: string;
    content: string;
  };
</script>

<div class="message">
  <div class="sender">
    <img src="/ops_bg.jpg" alt="Sender" />
    <div class="sender-info">
      <b>{message.name}</b>
      <p class="username">{message.sender}</p>
    </div>
  </div>
  <p class="content">{message.content}</p>
</div>

<style>
  .message {
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  .message > .content {
    margin-top: 5px;
  }

  .sender > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .sender {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sender-info {
    display: flex;
    flex-direction: column;
  }

  .username {
    font-size: 14px;
    color: #666;
    margin: 0;
  }
</style>
