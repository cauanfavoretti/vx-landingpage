"use client";

import { Component, type ReactNode } from "react";

/**
 * Isola enfeites visuais opcionais (WebGL, embeds) do resto da página.
 * Sem isto, uma exceção no <Canvas> derruba a árvore React inteira e a
 * página fica em branco — por exemplo em navegadores sem WebGL.
 */
export class SafeBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[SafeBoundary] elemento decorativo desativado:", error);
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
