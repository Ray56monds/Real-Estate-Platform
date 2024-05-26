import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NiraService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async verifyNationalId(
    nationalId: string,
    dateOfBirth: string,
  ): Promise<boolean> {
    const niraApiUrl = this.configService.get<string>('NIRA_API_URL');
    const niraApiKey = this.configService.get<string>('NIRA_API_KEY');

    try {
      const response = await this.httpService
        .post(
          `${niraApiUrl}/verify`,
          {
            nationalId,
            dateOfBirth,
          },
          {
            headers: {
              Authorization: `Bearer ${niraApiKey}`,
            },
          },
        )
        .toPromise();

      return response.data.isValid;
    } catch (error) {
      console.error('NIRA verification error:', error);
      return false;
    }
  }
}
