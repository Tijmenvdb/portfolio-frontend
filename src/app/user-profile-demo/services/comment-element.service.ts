import { ElementRef, Injectable } from '@angular/core';

export enum CommentElementType {
  Main,
  Drawer,
  Header,
  Hook,
  Section,
  Comment
}

@Injectable({
  providedIn: 'root'
})
export class CommentElementService { // Comment Element Service

  private main?: HTMLElement;
  private drawer?: HTMLElement;
  private header?: HTMLElement;

  public hooks = new Map<string, HTMLElement>();
  private sections = new Map<string, HTMLElement>();
  public comments = new Map<string, HTMLElement>();

  private activeHookId?: string;
  private activeCommentId?: string;

  constructor() { }

  // registerEl
  registerElement(elementType: CommentElementType, element: HTMLElement, id?: string) {
    switch(elementType) {
      case CommentElementType.Main: {
        this.main = element;
        break;
      }
      case CommentElementType.Drawer: {
        this.drawer = element;
        break;
      }
      case CommentElementType.Header: {
        this.header = element;
        break;
      }
      case CommentElementType.Hook: {
        if(id) {
          this.hooks.set(id, element);
        }
        break;
      }
      case CommentElementType.Section: {
        if(id) {
          this.sections.set(id, element);
        }
        break;
      }
      case CommentElementType.Comment: {
        if(id) {
          this.comments.set(id, element);
        }
        break;
      }
    }
  }

  // deregisterEl
  deregisterElement(elementType: CommentElementType, id?: string) {
    if(!id) {
      return;
    }

    switch(elementType) {
      case CommentElementType.Hook: {
        this.hooks.delete(id);
        break;
      }
      case CommentElementType.Section: {
        this.sections.delete(id);
        break;
      }
      case CommentElementType.Comment: {
        this.comments.delete(id);
        break;
      }
    }
  }

  // focus private
  activeElement(sectionId: string, commentId: string) {
    this.activeHookId = sectionId;
    this.activeCommentId = commentId;

    this.hooks.get(sectionId)?.classList.add('focus');
    this.comments.get(commentId)?.classList.add('focus');
  }

  // unfocus private
  deactiveElement() {
    if(!this.activeCommentId || !this.activeHookId) {
      return;
    }

    this.hooks.get(this.activeHookId)?.classList.remove('focus');
    this.comments.get(this.activeCommentId)?.classList.remove('focus');
    this.activeHookId = undefined;
    this.activeCommentId = undefined;
  }

  // static getFirstFocusableEl(container)
  // focusFirstElement(container)
  getFocusableElements(container?: HTMLElement): NodeListOf<HTMLElement> | undefined {
    const focusableSelectors = `
      a[href],
      button:not([disabled]),
      textarea:not([disabled]),
      input:not([disabled]),
      select:not([disabled]),
      [tabindex]:not([tabindex="-1"])
    `;

    return container?.querySelectorAll<HTMLElement>(focusableSelectors);
  }

  // 
  focus(sectionId: string, commentId: string) {
    const isListening = !!this.activeCommentId;

    if(this.activeCommentId == commentId) {
      return;
    }

    this.deactiveElement();
    this.activeElement(sectionId, commentId);

    if(isListening) {
      return;
    }

    const handler = (event: MouseEvent) => {
      setTimeout(() => {
        if(!this.activeCommentId || !this.activeHookId) {
          document.removeEventListener('click', handler);
          return;
        }

        const currComment = this.comments.get(this.activeCommentId);
        const currHook = this.hooks.get(this.activeHookId);
        if (!currComment?.contains(event.target as Node) && !currComment?.contains(document.activeElement) && !currHook?.contains(document.activeElement)) {
          this.deactiveElement();
          document.removeEventListener('click', handler);
        }
      }, 1)
    }

    document.addEventListener('click', handler);
  }

  jumpToHook(sectionId: string, commentId: string) {
    this.hooks.get(sectionId)?.focus({preventScroll: true});
    this.focus(sectionId, commentId);
    this.scrollToHook(sectionId);
    this.scrollToSection(sectionId);
  }

  jumpToSection(sectionId: string, commentId: string) {
    this.getFocusableElements(this.comments.get(commentId))?.[0]?.focus({preventScroll: true});
    this.scrollToSection(sectionId);
  }

  jumpToComment(sectionId: string, commentId: string) {
    this.getFocusableElements(this.comments.get(commentId))?.[0]?.focus({preventScroll: true});
    this.scrollToComment(commentId);
  }

  removeFocus() {
    this.deactiveElement();
  }

  scrollToElement(element?: HTMLElement, container?: HTMLElement, offsetElement?: HTMLElement) {
    const style = getComputedStyle(offsetElement as Element);
    const marginTop = parseFloat(style.marginTop);
    const marginBottom = parseFloat(style.marginBottom);

    const offset = (offsetElement?.offsetHeight ?? 0) + marginTop + marginBottom;

    container?.scrollTo(
      {
        top: element? element.offsetTop - offset : 0
      }
    )
  }

  scrollToHook(sectionId: string) {
    const hook = this.hooks.get(sectionId);
    this.scrollToElement(hook, this.main, this.header);
  }

  scrollToComment(commentId: string) {
    const comment = this.comments.get(commentId);
    this.scrollToElement(comment, this.drawer, this.header);
  }

  scrollToSection(sectionId: string) {
    const section = this.sections.get(sectionId);
    this.scrollToElement(section, this.drawer, this.header);
  }
}
