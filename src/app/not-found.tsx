import { api404NotFound } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

export const dynamic = 'force-dynamic';
export default async function NotFound() {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      color: '#333',
      padding: '20px',
    },
    heading: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#ff4d4f',
    },
    paragraph: {
      fontSize: '1.2rem',
      lineHeight: '1.5',
      maxWidth: '600px',
    },
    link: {
      marginTop: '20px',
      fontSize: '1rem',
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };
  const companyDomain = (await cookieService.get("domain"));
  const headersList = headers();
  const currentPath = (await headersList).get("x-url") ?? "";
  const notFoundResponse = await api404NotFound(companyDomain?.domain, currentPath)
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.paragraph}>
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link href="/" target="_blank" style={styles.link}>
        <div style={styles.link}>Go back to the homepage</div>
      </Link>
    </div>
  );
}
