import {
  EntityManager as EntityManager1,
  BaseEntity,
  configureMetadata,
  EntityMetadata,
  PrimaryKeySerde,
  SimpleSerde,
  ForeignKeySerde,
} from "joist-orm";
import { Author, authorConfig, newAuthor, Book, bookConfig, newBook } from "./entities";

export class EntityManager extends EntityManager1<{}> {}

export function getEm(e: BaseEntity): EntityManager {
  return e.__orm.em as EntityManager;
}

export const authorMeta: EntityMetadata<Author> = {
  cstr: Author,
  type: "Author",
  tagName: "a",
  tableName: "authors",
  columns: [
    { fieldName: "id", columnName: "id", dbType: "int", serde: new PrimaryKeySerde(() => authorMeta, "id", "id") },

    {
      fieldName: "firstName",
      columnName: "first_name",
      dbType: "character varying",
      serde: new SimpleSerde("firstName", "first_name"),
    },

    {
      fieldName: "lastName",
      columnName: "last_name",
      dbType: "character varying",
      serde: new SimpleSerde("lastName", "last_name"),
    },

    {
      fieldName: "createdAt",
      columnName: "created_at",
      dbType: "timestamp with time zone",
      serde: new SimpleSerde("createdAt", "created_at"),
    },

    {
      fieldName: "updatedAt",
      columnName: "updated_at",
      dbType: "timestamp with time zone",
      serde: new SimpleSerde("updatedAt", "updated_at"),
    },
  ],
  fields: [
    { kind: "primaryKey", fieldName: "id", fieldIdName: undefined, required: true },

    {
      kind: "primitive",
      fieldName: "firstName",
      fieldIdName: undefined,
      derived: false,
      required: true,
      protected: false,
      type: "string",
    },
    {
      kind: "primitive",
      fieldName: "lastName",
      fieldIdName: undefined,
      derived: false,
      required: false,
      protected: false,
      type: "string",
    },
    {
      kind: "primitive",
      fieldName: "createdAt",
      fieldIdName: undefined,
      derived: "orm",
      required: false,
      protected: false,
      type: "Date",
    },
    {
      kind: "primitive",
      fieldName: "updatedAt",
      fieldIdName: undefined,
      derived: "orm",
      required: false,
      protected: false,
      type: "Date",
    },
    {
      kind: "o2m",
      fieldName: "books",
      fieldIdName: "bookIds",
      required: false,
      otherMetadata: () => bookMeta,
      otherFieldName: "author",
    },
  ],
  config: authorConfig,
  factory: newAuthor,
};

(Author as any).metadata = authorMeta;

export const bookMeta: EntityMetadata<Book> = {
  cstr: Book,
  type: "Book",
  tagName: "b",
  tableName: "books",
  columns: [
    { fieldName: "id", columnName: "id", dbType: "int", serde: new PrimaryKeySerde(() => bookMeta, "id", "id") },

    {
      fieldName: "title",
      columnName: "title",
      dbType: "character varying",
      serde: new SimpleSerde("title", "title"),
    },

    {
      fieldName: "createdAt",
      columnName: "created_at",
      dbType: "timestamp with time zone",
      serde: new SimpleSerde("createdAt", "created_at"),
    },

    {
      fieldName: "updatedAt",
      columnName: "updated_at",
      dbType: "timestamp with time zone",
      serde: new SimpleSerde("updatedAt", "updated_at"),
    },

    {
      fieldName: "author",
      columnName: "author_id",
      dbType: "int",
      serde: new ForeignKeySerde("author", "author_id", () => authorMeta),
    },
  ],
  fields: [
    { kind: "primaryKey", fieldName: "id", fieldIdName: undefined, required: true },

    {
      kind: "primitive",
      fieldName: "title",
      fieldIdName: undefined,
      derived: false,
      required: true,
      protected: false,
      type: "string",
    },
    {
      kind: "primitive",
      fieldName: "createdAt",
      fieldIdName: undefined,
      derived: "orm",
      required: false,
      protected: false,
      type: "Date",
    },
    {
      kind: "primitive",
      fieldName: "updatedAt",
      fieldIdName: undefined,
      derived: "orm",
      required: false,
      protected: false,
      type: "Date",
    },
    {
      kind: "m2o",
      fieldName: "author",
      fieldIdName: "authorId",
      required: true,
      otherMetadata: () => authorMeta,
      otherFieldName: "books",
    },
  ],
  config: bookConfig,
  factory: newBook,
};

(Book as any).metadata = bookMeta;

export const allMetadata = [authorMeta, bookMeta];
configureMetadata(allMetadata);
