import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {
  saveAssessment,
  getAllAssessments,
  getParticipantHistory,
  saveParticipantHistory,
  getCustomRoles,
  saveCustomRole,
  getCustomQuestions,
  saveCustomQuestion,
  saveUserLead,
  getAllUserLeads
} from './server/sqliteDb.js';

function readJsonBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: any, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function sqliteApiPlugin() {
  const handler = async (req: any, res: any, next: any) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    if (!pathname.startsWith('/api/sqlite')) {
      return next();
    }

    try {
      // 1. Status
      if (pathname === '/api/sqlite/status' && req.method === 'GET') {
        return sendJson(res, 200, {
          success: true,
          connected: true,
          engine: 'SQLite',
          databaseFile: 'mindlyft.db',
          timestamp: new Date().toISOString()
        });
      }

      // 2. Assessments (Save / List)
      if (pathname === '/api/sqlite/assessments') {
        if (req.method === 'POST') {
          const body = await readJsonBody(req);
          const result = saveAssessment(body);
          return sendJson(res, 200, result);
        } else if (req.method === 'GET') {
          const rows = getAllAssessments();
          return sendJson(res, 200, { success: true, assessments: rows });
        }
      }

      // 2b. User Leads / Participant Profiles
      if (pathname === '/api/sqlite/leads') {
        if (req.method === 'POST') {
          const body = await readJsonBody(req);
          const result = saveUserLead(body);
          return sendJson(res, 200, result);
        } else if (req.method === 'GET') {
          const leads = getAllUserLeads();
          return sendJson(res, 200, { success: true, leads });
        }
      }

      // 3. Participant Question History
      if (pathname === '/api/sqlite/history') {
        if (req.method === 'GET') {
          const participantId = url.searchParams.get('participantId');
          const history = getParticipantHistory(participantId);
          return sendJson(res, 200, { success: true, history });
        } else if (req.method === 'POST') {
          const body = await readJsonBody(req);
          const result = saveParticipantHistory(body.participantId, body.questionIds);
          return sendJson(res, 200, result);
        }
      }

      // 4. Role Catalog Overrides
      if (pathname === '/api/sqlite/roles') {
        if (req.method === 'GET') {
          const roles = getCustomRoles();
          return sendJson(res, 200, { success: true, roles });
        } else if (req.method === 'POST') {
          const body = await readJsonBody(req);
          const result = saveCustomRole(body.roleCode, body.data);
          return sendJson(res, 200, result);
        }
      }

      // 5. Question Bank Overrides
      if (pathname === '/api/sqlite/questions') {
        if (req.method === 'GET') {
          const questions = getCustomQuestions();
          return sendJson(res, 200, { success: true, questions });
        } else if (req.method === 'POST') {
          const body = await readJsonBody(req);
          const result = saveCustomQuestion(body.questionId, body.data);
          return sendJson(res, 200, result);
        }
      }

      return sendJson(res, 404, { error: 'Not found' });
    } catch (err: any) {
      console.error('SQLite API error:', err);
      return sendJson(res, 500, { error: err.message || 'Internal SQLite error' });
    }
  };

  return {
    name: 'vite-plugin-sqlite-api',
    configureServer(server: any) {
      server.middlewares.use((req: any, _res: any, next: any) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        if (url.pathname === '/admin' || url.pathname === '/admin/') {
          req.url = '/admin.html';
        }
        next();
      });
      server.middlewares.use(handler);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use((req: any, _res: any, next: any) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        if (url.pathname === '/admin' || url.pathname === '/admin/') {
          req.url = '/admin.html';
        }
        next();
      });
      server.middlewares.use(handler);
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), sqliteApiPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        admin: path.resolve(__dirname, 'admin.html')
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
