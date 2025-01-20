import { db } from "../../db";
import { Schema } from "../types/schema";
import { Option } from "../../types/option";
import { omit } from "lodash";

const newDb = db;

export const getTitles = (): Option[] | undefined => {
  if (newDb.titles.length) {
    return newDb.titles;
  }

  return undefined;
};

export const getSkills = (): Option[] | undefined => {
  if (newDb.skills.length) {
    return newDb.skills;
  }

  return undefined;
};

export const getUsers = (): Option[] | undefined => {
  if (newDb.users.length) {
    return newDb.users.map((user) => ({ id: user.id, label: user.name }));
  }

  return undefined;
};

export const getUser = (id: string): Schema | undefined => {
  const user = newDb.users.find((user) => user.id === id);

  if (user) {
    return {
      variant: "edit",
      id: user.id,
      title: user.title,
      name: user.name,
      email: user.email,
      skills: user.skills,
      workExperience: user.workExperience,
      companyAndTimeRange:
        user.companyAndTimeRange?.map((item) => ({
          company: item.company,
          timeRange: [new Date(item.timeRange[0]), new Date(item.timeRange[1])],
        })) || [],
    };
  }

  return undefined;
};

export const createUser = (data: Schema) => {
  if (data) {
    const maxId = Math.max(...newDb.users.map((user) => +user.id));
    newDb.users.push({ ...omit(data, "variant"), id: (maxId + 1).toString() });
  }
};

export const editUser = (data: Schema) => {
  if (data.variant === "edit") {
    newDb.users = newDb.users.map((user) => {
      if (user.id === data.id) {
        return omit(data, "variant");
      }

      return user;
    });
  }
};
