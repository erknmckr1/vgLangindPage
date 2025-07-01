import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

// log.helper.ts
export default async function sendLogoutLog({
  httpService,
  userId,
}: {
  httpService: HttpService;
  userId: string;
}) {
  try {
    await firstValueFrom(
      httpService.post(`${process.env.LOG_API}/logs/expired`, {
        userId,
      }),
    );
  } catch (err) {
    console.log(err);
  }
}
