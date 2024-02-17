/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CfApiService } from './cfapi.service';
import { NtfyService } from './ntfy.service';

@Injectable()
export class cronService {
  constructor(
    private readonly cfApiService: CfApiService,
    private readonly ntfyService: NtfyService,
  ) {}

  findTodaysContest(contests) {
    const today = new Date();
    const todayContests = contests.filter((contest) => {
      const contestDate = new Date(contest.startTimeSeconds * 1000);
      return (
        contestDate.getDate() === today.getDate() &&
        contestDate.getMonth() === today.getMonth() &&
        contestDate.getFullYear() === today.getFullYear()
      );
    });
    return todayContests;
  }

  @Cron("0 13 * * *")
  notificationsForTodaysContest() {
    console.log('Task executed every 10 seconds');
    this.cfApiService
      .getContestsList()
      .then((response) => {
        const todayContests = this.findTodaysContest(response.result);
        console.log(todayContests);
        if (todayContests.length > 0) {
          todayContests.forEach((contest) => {
            let formattedDate = new Date(contest.startTimeSeconds * 1000);
            let dateString = `${formattedDate.getHours()}:${formattedDate.getMinutes()}`;
            const content = {
              topic: 'codeforces',
              title: 'Contest Starting',
              message: `Contest **${contest.name}** is starting today at ${dateString}`,
              tags: ['computer'],
              actions: [
                {
                  action: 'view',
                  label: 'Go to contest',
                  url: `https://codeforces.com/contest/${contest.id}`,
                },
              ],
            };
            this.ntfyService
              .sendNotification(JSON.stringify(content), { 'Markdown': 'yes' })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });

            // this.ntfyService.sendNotification(`Contest ${contest.name} is starting at ${new Date(contest.startTimeSeconds * 1000)}`,
            //   { 'Tags': 'computer',  },
            //  'codeforces');
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // @Cron('45 * * * * *')
  // handleEvery45Seconds() {
  //   console.log('Task executed every 45 seconds');
  // }
}
