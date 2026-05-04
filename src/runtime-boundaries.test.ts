import { describe, expect, it } from "vitest";

import packageJson from "../package.json";
import mainSource from "./main.tsx?raw";
import storageSource from "./storage.ts?raw";

const dependencyNames = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.devDependencies ?? {}),
];

const forbiddenDependencyPatterns = [
  /firebase/i,
  /supabase/i,
  /amplify/i,
  /appwrite/i,
  /auth0/i,
  /stripe/i,
  /revenuecat/i,
  /sentry/i,
  /posthog/i,
  /mixpanel/i,
  /onesignal/i,
  /capacitor/i,
  /cordova/i,
  /expo/i,
  /react-native/i,
];

const appRuntimeSources = `${mainSource}\n${storageSource}`;

describe("runtime boundaries", () => {
  it("keeps package dependencies free of account, payment, analytics, push, and native SDKs", () => {
    for (const dependencyName of dependencyNames) {
      for (const pattern of forbiddenDependencyPatterns) {
        expect(dependencyName, `${dependencyName} should stay out until explicitly approved`).not.toMatch(
          pattern,
        );
      }
    }
  });

  it("keeps the app runtime local-first without network submission APIs", () => {
    expect(appRuntimeSources).not.toContain("fetch(");
    expect(appRuntimeSources).not.toContain("XMLHttpRequest");
    expect(appRuntimeSources).not.toContain("sendBeacon");
    expect(appRuntimeSources).not.toContain("Notification.requestPermission");
  });

  it("keeps learning persistence scoped to browser localStorage", () => {
    expect(storageSource).toContain("window.localStorage");
    expect(storageSource).not.toContain("indexedDB");
    expect(storageSource).not.toContain("sessionStorage");
  });
});
