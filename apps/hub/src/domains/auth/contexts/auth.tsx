import { IdentifyUser } from "@/components/third-party-providers";
import {
  identityTokenQueryOptions,
  selfProfileQueryOptions,
  useLogoutMutation,
} from "@/domains/user/queries";
import type { Rivet } from "@rivet-gg/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect } from "react";
import { bootstrapQueryOptions } from "../queries/bootstrap";

export interface AuthContext {
  profile: Rivet.identity.GetProfileResponse | undefined;
  logout: () => void;
  refreshToken: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isSuccess, refetch: refetchSession } = useSuspenseQuery(
    identityTokenQueryOptions(),
  );
  const { data: profile, refetch: refetchProfile } = useSuspenseQuery(
    selfProfileQueryOptions({ enabled: isSuccess }),
  );

  const { mutate: logout } = useLogoutMutation();

  useSuspenseQuery(bootstrapQueryOptions({ enabled: isSuccess }));

  const refreshToken = useCallback(async () => {
    await refetchSession();
    await refetchProfile();
  }, [refetchSession, refetchProfile]);

  return (
    <AuthContext.Provider value={{ profile, refreshToken, logout }}>
      <IdentifyUser />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
