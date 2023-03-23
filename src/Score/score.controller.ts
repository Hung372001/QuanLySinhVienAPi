/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { ScoreService } from './score.service';
import { Subject } from 'rxjs';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}
  @Post('')
  create(
    @Body()
    score: {
      Score15m: string;
      Score45m: string;
      Score60m: string;
      semester: string;
      accountId: string;
      subjectName: string;
    },
  ) {
    const { Score15m, Score45m, Score60m, semester, accountId, subjectName } =
      score;
    return this.scoreService.createScore({
      Score15m,
      Score45m,
      Score60m,
      semester,
      Account: {
        connect: {
          id: accountId,
        },
      },
      Subject: {
        connect: {
          name: subjectName,
        },
      },
    });
  }
}
