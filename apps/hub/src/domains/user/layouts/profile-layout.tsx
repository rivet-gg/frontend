import { useAuth } from "@/domains/auth/contexts/auth";
import { faRightFromBracket } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Flex,
  Link,
  Separator,
  SidebarNavigation,
  SidebarPageContent,
} from "@rivet-gg/components";
import { Link as InternalLink } from "@tanstack/react-router";
import type { ReactNode } from "react";

export interface ProfilePageProps {
  children: ReactNode;
}

function ProfilePage({ children }: ProfilePageProps) {
  const { logout } = useAuth();

  return (
    <SidebarPageContent
      sidebar={
        <SidebarNavigation>
          <InternalLink className="data-active:text-foreground font-semibold">
            Your Account
          </InternalLink>
          <Link
            onClick={logout}
            className="align-center cursor-pointer no-underline"
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="mr-2 inline-block size-4"
            />
            Logout
          </Link>
          <Separator />
          <Link
            href="https://rivet.gg/privacy"
            className="no-underline"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </Link>
          <Link
            href="https://rivet.gg/terms"
            target="_blank"
            rel="noreferrer"
            className="no-underline"
          >
            Terms of Service
          </Link>
          <Link
            className="no-underline"
            href="https://rivet.gg/support"
            target="_blank"
            rel="noreferrer"
          >
            Support
          </Link>
        </SidebarNavigation>
      }
    >
      <Flex gap="4" direction="col">
        {children}
      </Flex>
    </SidebarPageContent>
  );
}

export { ProfilePage as Root };
