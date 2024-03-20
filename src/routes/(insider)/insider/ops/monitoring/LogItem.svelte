<script lang="ts">
    export let time: Date | string = new Date();
    export let level: string = "INFO";
    export let message: string = "<no message>";
</script>

<div class="log-item">
  <div class="time">{typeof time === "string" ? time : time.toLocaleString()}</div>
  <div class="level">{level}</div>
  <div class="message">{message}</div>
</div>

<style>
  .log-item {
    display: flex;
    height: 30px;
    line-height: 30px;
  }

  .log-item:nth-child(even) {
    background-color: #f0f0f0;
  }

  .log-item .time {
    width: 150px;
    font-size: 12px;
    color: #999;
  }

  .log-item .level {
    width: 50px;
    font-size: 12px;
    color: #999;
  }

  .log-item .message {
    flex: 1;
    font-size: 12px;
    color: #333;
  }
</style>
