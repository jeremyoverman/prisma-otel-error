import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
  PeriodicExportingMetricReader
} from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrismaInstrumentation } from '@prisma/instrumentation';

const otelUrl = process.env.OTEL_URL || 'locahost:4318';

const sdk = new NodeSDK({
  traceExporter:  new OTLPTraceExporter({
    url: `${otelUrl}/v1/traces`,
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: `${otelUrl}/v1/metrics`,
    }),
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    // https://github.com/prisma/prisma/discussions/25916
    new PrismaInstrumentation(),
  ],
});

sdk.start();
