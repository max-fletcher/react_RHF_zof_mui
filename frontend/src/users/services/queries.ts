import { useQuery } from "@tanstack/react-query"
import { getGenders, getLanguages, getSkills, getStates } from "./apis"

export function useStates() {
  return useQuery({
    queryKey: ['states'],
    queryFn: getStates
  })
}

export function useLanguages() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: getLanguages
  })
}

export function useGenders() {
  return useQuery({
    queryKey: ['languages'],
    queryFn: getGenders
  })
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills
  })
}