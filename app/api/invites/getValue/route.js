import { getInviteValueFromToken } from "@/lib/getTokenInviteValues";

export const dynamic = "force-dynamic"; 

export const GET = async(req) => {
    const token = req.nextUrl.searchParams.get("token");;

    try {
        if (!token) {
            return new Response(
                JSON.stringify({ error: 'Token is required' }),
                { status: 400 }
            );
        }
    
        const inviteValue = await getInviteValueFromToken(token);
        
        if (!inviteValue) {
            return new Response(
                JSON.stringify({ error: 'Invite not found' }),
                { status: 400 }
            );
        }
        
        return new Response(
            JSON.stringify({ inviteValue: inviteValue }),
            { status: 200 }
          );

    }catch(error){
        console.error("Error en el servidor:", error);
        return new Response(
          JSON.stringify({ error: "Error en el servidor" }),
          { status: 500 }
        );
    }
}