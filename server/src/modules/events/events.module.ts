import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { EventListenerService } from './event-listener.service';

@Module({
  imports: [EmailModule],
  providers: [EventListenerService],
})
export class EventsModule {}
