export interface Note {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface createNote {
  title: string;
  text?: string;
}

export interface updateNote {
  title: string;
  text?: string;
}
