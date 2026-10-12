"use client";

import { useSyncExternalStore } from "react";

const SERVER_NOW = Date.parse("2026-10-12T12:00:00");

let clientNow: number | null = null;

function subscribe(onStoreChange: () => void) {
  const timer = window.setInterval(() => {
    clientNow = Date.now();
    onStoreChange();
  }, 60_000);
  return () => window.clearInterval(timer);
}

function getNow() {
  clientNow ??= Date.now();
  return clientNow;
}

function getServerNow() {
  return SERVER_NOW;
}

export function useClinicNow() {
  return useSyncExternalStore(subscribe, getNow, getServerNow);
}
