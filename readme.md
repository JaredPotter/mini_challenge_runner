# Asset Health - Mini Challenge Runner

Cron job + node + Puppeteer => automatic money

How to setup a cron job:

1. Place this project inside of this directory `~/code/`.

2. npm install

3. Create cron job
    
    Run `crontab -e`
    This opens in vi. Simply push the `i` key to start "inserting". Once complete, hit `esc` key. Then `shift + :`, then `w`, `q` and enter. Should look like `:wq`. 
    
    `w` is write. `q` is quit.

4. Enter

    `0 9 * * * sh ~/code/mini_challenge_runner/miniChallengeRunner.sh username password`
    
    Where username is your Asset Health username, and password the same.
    
    No qutation marks around those.

    This will run at 9:00am local time every day.

Learn more about cron jobs:
https://ole.michelsen.dk/blog/schedule-jobs-with-crontab-on-mac-osx.html
