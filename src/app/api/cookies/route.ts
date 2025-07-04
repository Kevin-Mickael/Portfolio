import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accepted, settings } = body;

    // Créer la réponse
    const response = NextResponse.json({ 
      success: true, 
      message: 'Cookies sauvegardés avec succès' 
    });

    // Définir les cookies HTTP-only
    if (accepted) {
      // Cookie principal d'acceptation
      response.cookies.set('cookies-accepted', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 365 * 24 * 60 * 60, // 1 an
        path: '/'
      });

      // Cookie des paramètres
      response.cookies.set('cookie-settings', JSON.stringify(settings), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 365 * 24 * 60 * 60, // 1 an
        path: '/'
      });

      // Cookies individuels pour chaque type
      if (settings.analytics) {
        response.cookies.set('cookie-analytics', 'true', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 365 * 24 * 60 * 60,
          path: '/'
        });
      }

      if (settings.marketing) {
        response.cookies.set('cookie-marketing', 'true', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 365 * 24 * 60 * 60,
          path: '/'
        });
      }

      if (settings.preferences) {
        response.cookies.set('cookie-preferences', 'true', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 365 * 24 * 60 * 60,
          path: '/'
        });
      }
    }

    return response;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des cookies:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la sauvegarde des cookies' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookies = request.cookies;
    
    const cookieSettings = {
      accepted: cookies.get('cookies-accepted')?.value === 'true',
      analytics: cookies.get('cookie-analytics')?.value === 'true',
      marketing: cookies.get('cookie-marketing')?.value === 'true',
      preferences: cookies.get('cookie-preferences')?.value === 'true'
    };

    return NextResponse.json(cookieSettings);
  } catch (error) {
    console.error('Erreur lors de la récupération des cookies:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des cookies' },
      { status: 500 }
    );
  }
} 