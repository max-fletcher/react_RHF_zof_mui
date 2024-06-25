import axios from "axios";
import { Option } from "../../types/option"
import { Language } from "../../types/language";

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
  return (await axiosInstance.get<Option[]>(`gender`)).data
}

export const getSkills = async () => {
  // NOTE: will fetch data from "http://localhost:8080/todos" since BASE_URL is defined above
  return (await axiosInstance.get<Option[]>(`skills`)).data
}