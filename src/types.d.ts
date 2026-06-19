declare module 'degit' {
  interface DegitOptions {
    cache?: boolean;
    force?: boolean;
    verbose?: boolean;
    mode?: 'tar' | 'git';
  }

  interface DegitEmitter {
    clone(dest: string): Promise<void>;
    on(event: string, callback: (info: any) => void): void;
  }

  function degit(src: string, options?: DegitOptions): DegitEmitter;

  export default degit;
}
