import React, { createContext } from "react";
import { KeyedMutator } from "swr";

type mutate = KeyedMutator<any> | Function

export const TodoContext = createContext<mutate>(() => {
    return null
});

