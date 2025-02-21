import client from "@/lib/prismaInstance";

export const POST = async(req) => {
    try {
        const body = await req.json();
        let { inviteValue } = body;
        inviteValue = Number(inviteValue);

            
        if (!inviteValue) {
            return new Response(
                JSON.stringify({ error: 'Invite not found' }),
                { status: 400 }
            );
        }

        let isRegistered = false;

        try {
            isRegistered = await client.inscripcion.findFirst({
                where: {
                    entrada: inviteValue,
                },
            })

            isRegistered ? isRegistered = true : isRegistered = false;
            
        } catch (dbError) {
            console.error("Error al buscar en la base de datos:", dbError);
            return new Response(
                JSON.stringify({ error: "Error al buscar la inscripción en la base de datos" }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({ isRegistered }),
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