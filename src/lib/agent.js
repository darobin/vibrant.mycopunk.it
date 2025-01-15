
import { Agent } from '@atproto/api';

export let agent;

export async function setupAgent (session) {
  agent = new Agent(session);
}
