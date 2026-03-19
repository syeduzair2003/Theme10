import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const hostname = req.headers.get('host');

  const robotsText = `
    User-agent: *
    Disallow: /search
    Disallow: /out/
    Disallow: /_next/        
    Allow: /_next/static/    
    Allow: /_next/image      
    Sitemap: https://${hostname}/sitemap.xml
  `.trim();

  return new NextResponse(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}