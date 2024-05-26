import { Module } from '@nestjs/common';
import { NiraService } from './nira.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [NiraService],
  exports: [NiraService],
})
export class NiraModule {}
