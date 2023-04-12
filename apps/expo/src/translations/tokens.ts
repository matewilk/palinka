export enum HomeScreen {
  hello = "greeting",
  helloWithName = "greetingWithName",
  helloContent = "greetingContent",
  selectTaskBtn = "selectTaskBtn",
}

export enum PromptScreen {
  header = "promptHeader",
  subheader = "promptContent",
  inputPlaceholder = "promptInputPlaceholder",
  submitBtn = "promptSubmitBtn",
}

export enum ChatScreen {
  inputPlaceholder = "chatInputPlaceholder",
  submitBtn = "chatSubmitBtn",
  assistantWorking = "assistantWorking",
}

export enum ComposeParentNote {
  title = "composeParentNoteTitle",
  content = "composeParentNoteContent",
}

export enum PolishDocument {
  title = "polishDocumentTitle",
  content = "polishDocumentContent",
}

export enum CreateLessonPlan {
  title = "createLessonPlanTitle",
  content = "createLessonPlanContent",
}

export const taskSelection = {
  composeParentNote: ComposeParentNote,
  polishDocument: PolishDocument,
  createLessonPlan: CreateLessonPlan,
};

export const tokens = {
  screens: {
    home: HomeScreen,
    prompt: PromptScreen,
    chat: ChatScreen,
  },
  selection: {
    tasks: taskSelection,
  },
};
