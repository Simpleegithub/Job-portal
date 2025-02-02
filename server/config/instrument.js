// const Sentry = require("@sentry/node");
import * as Sentry from '@sentry/node'; // Use * as Sentry to import all named exports

// const { nodeProfilingIntegration } = require("@sentry/profiling-node");
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://7e22170ef5d51c47c473f8dbc05514e2@o4508748013568000.ingest.de.sentry.io/4508748021104720",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(),
    // nodeProfilingIntegration(),
  ],
  // Tracing
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
// Manually call startProfiler and stopProfiler
// to profile the code in between
Sentry.profiler.startProfiler();

// Starts a transaction that will also be profiled
Sentry.startSpan({
  name: "My First Transaction",
}, () => {
  // the code executing inside the transaction will be wrapped in a span and profiled
});

// Calls to stopProfiling are optional - if you don't stop the profiler, it will keep profiling
// your application until the process exits or stopProfiling is called.
Sentry.profiler.stopProfiler();