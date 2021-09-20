import { pwaValidator } from '@middleware/validation/pwa.validator';
import { PwaRouter } from '@routes/v1/pwa/pwa.router';

export const PwaRoute = new PwaRouter({ post: pwaValidator });
