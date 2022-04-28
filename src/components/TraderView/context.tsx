import { createContext } from "react";

import { TraderViewProps } from "./types";

export const TraderContext = createContext<TraderViewProps | null>(null);


const ProductData=createContext<TraderViewProps | null>(null);