import axios from "axios";
import { Option } from "../../types/option"
import { ApiCreateEdit, ApiGet } from "../types/apiTypes";

const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({baseURL:BASE_URL})

export const getStates = async () => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<Option[]>(`states`)).data
}

export const getLanguages = async () => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<Option[]>(`languages`)).data
}

export const getGenders = async () => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<Option[]>(`genders`)).data
}

export const getSkills = async () => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<Option[]>(`skills`)).data
}

export const getUsers = async () => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<ApiGet[]>(`users`)).data
}

// NOTE: We will use this for mutation. This is to add an item to the database/list.
export const createUser = async (data: ApiCreateEdit) => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  await axiosInstance.post<ApiCreateEdit>(`users`, data)
}

export const getSingleUser = async (id: number) => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<ApiGet>(`users/${id}`)).data
}