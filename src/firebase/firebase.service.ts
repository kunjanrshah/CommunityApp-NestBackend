import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import * as serviceAccount from '../../public/firebase-service-account.json';

@Injectable()
export class FirebaseService {
  private messaging: admin.messaging.Messaging;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    }
    this.messaging = admin.messaging();
  }

  async sendNotification(token: string, title: string, body: string): Promise<void> {
    const message = {
      notification: { title, body },
      token,
    };

    try {
      await this.messaging.send(message);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
