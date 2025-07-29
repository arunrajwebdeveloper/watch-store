import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from '../email/email.service';

@Injectable()
export class EventListenerService {
  constructor(private readonly emailService: EmailService) {}

  @OnEvent('product.created', { async: true })
  async handleProductCreated({
    model,
    brand,
  }: {
    model: string;
    brand: string;
  }) {
    console.log(`A product has been created as ${brand} ${model}`);
    await this.emailService.sendMail(
      'arunrajcvkl@gmail.com',
      'Welcome !',
      `<h1>Hello! </h1><p>Your product added!</p>`,
    );
  }

  @OnEvent('user.registered', { async: true })
  async handleUserRegistered(payload: { name: string; email: string }) {
    const { name, email } = payload;

    await this.emailService.sendMail(
      email,
      'Welcome !',
      `<h1>Hello ${name}</h1><p>Thanks for registering!</p>`,
    );
  }
}
