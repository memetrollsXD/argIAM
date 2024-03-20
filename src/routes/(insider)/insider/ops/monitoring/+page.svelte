<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import LogItemC from './LogItem.svelte';
  let logList: HTMLDivElement = null!;

  function getRandomTimeISOString() {
    const currentDate = new Date();

    // Set the time to a random value between 00:00:00 and 23:59:59
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomSeconds = Math.floor(Math.random() * 60);

    currentDate.setHours(randomHours, randomMinutes, randomSeconds, 0);

    return currentDate.toISOString();
  }

  class LogItem {
    public time = getRandomTimeISOString();
    public constructor(public readonly level: string, public readonly message: string) {}
  }

  const _logItems = [
    new LogItem('DEBUG', 'Entering function calculateTotal()'),
    new LogItem('INFO', `Processing user request for ID ${Math.floor(Math.random() * 10000000)}`),
    new LogItem('TRACE', 'Verifying network connection...'),
    new LogItem('DEBUG', "Variable 'counter' has a value of 42"),
    new LogItem('WARN', 'Possible memory leak detected in module XYZ'),
    new LogItem('ERROR', "Unable to open file 'data.txt' for writing"),
    new LogItem('TRACE', 'Executing step 3 of the algorithm'),
    new LogItem('DEBUG', 'Received response from API: {"status": "success"}'),
    new LogItem('INFO', 'Initializing database connection pool'),
    new LogItem('ERROR', 'Division by zero in function computeRatio()'),
    new LogItem('TRACE', 'Loop iteration 5 in progress'),
    new LogItem('DEBUG', 'Configuration loaded successfully'),
    new LogItem('INFO', "User 'xudong.zhong@arg.iam' authenticated successfully"),
    new LogItem('WARN', "Deprecated method 'processData()' called"),
    new LogItem('TRACE', "Checking permissions for user 'da.wei@arg.iam'"),
    new LogItem('TRACE', 'Initializing application modules'),
    new LogItem('TRACE', "Service account 'monitor@arg.iam' logged in (34addeb4f1a6b3201fccbf9cbac5ff4e)"),
    new LogItem('DEBUG', 'Executing database query: SELECT * FROM users'),
    new LogItem('ERROR', 'Unhandled exception in module XYZ: NullReferenceError'),
    new LogItem('INFO', "User 'zhanli.yang@arg.iam' logged in successfully"),
    new LogItem('WARN', 'Disk space running low on server'),
    new LogItem('TRACE', 'Processing incoming request: /api/v1/resource'),
    new LogItem('DEBUG', "Cache entry refreshed for key 'user_data'"),
    new LogItem('INFO', 'Application shutdown initiated'),
    new LogItem('ERROR', 'Database connection lost: ConnectionTimeoutError'),
    new LogItem('TRACE', 'Performing routine system health check'),
    new LogItem('TRACE', 'Initializing application modules'),
    new LogItem('DEBUG', 'Executing database query: SELECT * FROM users'),
    new LogItem('ERROR', 'Unhandled exception in module XYZ: NullReferenceError'),
    new LogItem('INFO', "User 'tianhui.ma@arg.iam' logged in successfully"),
    new LogItem('WARN', 'Disk space running low on server'),
    new LogItem('TRACE', 'Processing incoming request: /api/v1/resource'),
    new LogItem('DEBUG', "Cache entry refreshed for key 'user_data'"),
    new LogItem('INFO', 'Application shutdown initiated'),
    new LogItem('ERROR', 'Database connection lost: ConnectionTimeoutError'),
    new LogItem('TRACE', 'Performing routine system health check'),
    new LogItem('TRACE', 'Initializing application modules'),
    new LogItem('DEBUG', 'Executing database query: SELECT * FROM users'),
    new LogItem('ERROR', 'Unhandled exception in module XYZ: NullReferenceError'),
    new LogItem('INFO', "User 'xiaoyan.jin@arg.iam' logged in successfully"),
    new LogItem('WARN', 'Disk space running low on server'),
    new LogItem('TRACE', 'Processing incoming request: /api/v1/resource'),
    new LogItem('DEBUG', "Cache entry refreshed for key 'user_data'"),
    new LogItem('INFO', 'Application shutdown initiated'),
    new LogItem('ERROR', 'Database connection lost: ConnectionTimeoutError'),
    new LogItem('TRACE', 'Performing routine system health check'),
    new LogItem('TRACE', 'Reading configuration file'),
    new LogItem('INFO', 'Deploying version 2.0 of the application'),
    new LogItem('TRACE', 'Analyzing performance metrics'),
    new LogItem('INFO', 'XeonDB server started on port 8080'),
    new LogItem('ERROR', 'Critical error in module ABC: Segmentation fault'),
    new LogItem('WARN', 'Unusual network activity detected'),
    new LogItem('INFO', "User 'jinbo.huang@arg.iam' updated profile information"),
    new LogItem('DEBUG', 'Executing scheduled backup'),
    new LogItem('TRACE', 'Performing security scan on the system'),
    new LogItem('ERROR', 'Out of memory: Application crashed'),
    new LogItem('INFO', 'Server load balancer reconfigured'),
    new LogItem('DEBUG', 'Initializing background tasks'),
    new LogItem('TRACE', 'Updating database schema'),
    new LogItem('ERROR', 'Security breach detected: Unauthorized access'),
    new LogItem('INFO', "User 'qiulin.feng@arg.iam' created a new document"),
    new LogItem('WARN', 'Network latency exceeding thresholds'),
    new LogItem('TRACE', 'Generating reports for the day'),
    new LogItem('DEBUG', 'Optimizing query performance'),
    new LogItem('INFO', "User 'jianxin.sun@arg.iam' deleted account"),
    new LogItem('ERROR', 'Critical server hardware failure'),
    new LogItem('TRACE', 'Analyzing application logs'),
    new LogItem('DEBUG', 'Initializing messaging queue'),
    new LogItem('WARN', 'Excessive failed login attempts'),
    new LogItem('TRACE', 'Monitoring system resources'),
    new LogItem('ERROR', 'Database connection timeout'),
    new LogItem('INFO', "User 'li.chen02@arg.iam' changed password"),
    new LogItem('DEBUG', 'Processing incoming data stream'),
    new LogItem('TRACE', 'Validating user input'),
    new LogItem('WARN', 'Software update available: Version 3.0'),
    new LogItem('TRACE', 'Performing security audit'),
    new LogItem('DEBUG', 'Parsing XML configuration file'),
    new LogItem('ERROR', 'Database connection failed: AuthenticationError'),
    new LogItem('INFO', "User 'weijie.fan@arg.iam' created a new document"),
    new LogItem('WARN', 'Server response time exceeding threshold'),
    new LogItem('TRACE', 'Cleaning up temporary files'),
    new LogItem('DEBUG', 'Executing background cron job'),
    new LogItem('INFO', 'System upgrade in progress'),
    new LogItem('ERROR', 'Unexpected server shutdown'),
    new LogItem('TRACE', 'Optimizing network routing tables'),
    new LogItem('DEBUG', 'Generating API documentation'),
    new LogItem('INFO', "User 'ni.huang@arg.iam' updated profile information"),
    new LogItem('WARN', 'Potential security vulnerability detected in module XYZ'),
    new LogItem('TRACE', 'Monitoring application performance'),
    new LogItem('TRACE', 'Session ID 34addeb4f1a6b3201fccbf9cbac5ff4e started'),
    new LogItem('ERROR', 'File not found: /var/log/error.log'),
    new LogItem('INFO', 'Backup completed successfully'),
    new LogItem('DEBUG', 'Initializing message queue worker'),
    new LogItem('TRACE', 'Analyzing user behavior patterns'),
    new LogItem('WARN', 'External API request failed: Timeout'),
    new LogItem('WARN', 'Clearing expired API tokens'),
    new LogItem('ERROR', 'Critical hardware malfunction detected'),
    new LogItem('INFO', 'Deploying security patch'),
    new LogItem('TRACE', 'Configuring load balancing parameters'),
    new LogItem('DEBUG', 'Executing scheduled maintenance tasks'),
    new LogItem('ERROR', 'Server crash: Memory exhaustion'),
    new LogItem('WARN', 'Data integrity check failed'),
    new LogItem('TRACE', 'Performing code review'),
    new LogItem('DEBUG', 'Application performance tuning'),
    new LogItem('TRACE', 'Verifying SSL certificate validity'),
    new LogItem('ERROR', 'Failed to send email: SMTPError'),
    new LogItem('WARN', 'Insufficient permissions for operation'),
    new LogItem('INFO', 'Initializing caching mechanism'),
    new LogItem('DEBUG', 'Executing automated tests'),
    new LogItem('TRACE', 'Checking server uptime'),
    new LogItem('ERROR', 'Database deadlock detected'),
    new LogItem('INFO', 'User session timeout warning'),
    new LogItem('WARN', 'Network partition detected'),
    new LogItem('DEBUG', 'Processing payment transaction')
  ];

  const logItems = [..._logItems, ..._logItems, ..._logItems, ..._logItems, ..._logItems].map(x => { return { level: x.level, message: x.message, time: getRandomTimeISOString() } }).sort(
    (a, b) => a.time.localeCompare(b.time)
  );

  onMount(() => {
    for (const log of logItems) {
      new LogItemC({
        target: logList,
        props: { ...log }
      });
    }
  });
</script>

<div class="main-container">
  <div class="header">
    <h1>Monitoring</h1>

    <div class="action-buttons">
      <button>Clear</button>
      <button>Filter</button>
    </div>
  </div>

  <div class="log-list" bind:this={logList} />
</div>

<style>
  .main-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  .header {
    width: 100%;
    height: 50px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
  }

  .header h1 {
    margin: 0;
    padding: 0;
    line-height: 50px;
    padding-left: 10px;
    font-size: 20px;
  }

  .action-buttons {
    margin-left: 20px;
    margin-right: auto;
    display: flex;
    align-items: center;
  }

  .action-buttons button {
    height: 30px;
    line-height: 29px;
    padding: 0 0.5rem;
    min-width: 55px;
    border: none;
    cursor: pointer;
    outline: none;
    background: white;
    border: 1px solid #ccc;
    border-radius: 2px;
    margin-left: 10px;
  }

  .log-list {
    width: 100%;
    height: calc(100vh - 50px);
    overflow-y: scroll;
    padding: 10px;
  }

  .log-item .message .highlight {
    color: gold;
  }
</style>
