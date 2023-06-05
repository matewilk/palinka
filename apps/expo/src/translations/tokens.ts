export enum WelcomeScreen {
  header = "welcomeHeader",
  subheader = "welcomeSubheader",
  nextBtn = "welcomeNextBtn",
}

export enum IntroScreen {
  header = "introHeader",
  subheader = "introSubheader",
  nextBtn = "introNextBtn",
}

export enum LoginScreen {
  header = "loginHeader",
  subheader = "loginSubheader",
  loginWithGoogleBtn = "loginWithGoogleBtn",
}

export enum ProfileScreen {
  firstName = "profileFirstName",
  lastName = "profileLastName",
  email = "profileEmail",
  deleteAccountBtn = "profileDeleteAccountBtn",
}

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

export enum OcrScanScreen {
  subheader = "ocrScanSubheader",
  selectImageBtn = "selectImageBtn",
  scanBtn = "scanBtn",
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

export enum DrawerPanel {
  home = "drawerHome",
  profile = "drawerProfile",
  scaner = "drawerScaner",
  logout = "drawerLogout",
}

export const taskSelection = {
  composeParentNote: ComposeParentNote,
  polishDocument: PolishDocument,
  createLessonPlan: CreateLessonPlan,
};

export enum EditText {
  title = "editTextTitle",
  content = "editTextContent",
}

export enum RespondToText {
  title = "respondToTextTitle",
  content = "respondToTextContent",
}

export const ocrTaskSelection = {
  editText: EditText,
  respondToText: RespondToText,
};

export const tokens = {
  screens: {
    welcome: WelcomeScreen,
    intro: IntroScreen,
    login: LoginScreen,
    profile: ProfileScreen,
    home: HomeScreen,
    prompt: PromptScreen,
    chat: ChatScreen,
    ocrScan: OcrScanScreen,
  },
  selection: {
    tasks: taskSelection,
    ocrTasks: ocrTaskSelection,
  },
  drawer: DrawerPanel,
};
