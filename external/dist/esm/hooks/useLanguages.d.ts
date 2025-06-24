export declare const useLanguages: () => {
  availableLanguages: string[];
  selectedLanguageCode: string | undefined;
  selectedLanguageDisplayName: string;
  setLanguageWithCode: (code: string) => void;
};
