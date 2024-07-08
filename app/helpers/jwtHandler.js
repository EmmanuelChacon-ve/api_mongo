import jwt from "jsonwebtoken";
const verifyJwtToken = (req,res,next) => 
    {
        const {token} = req.body
        try {

            const tokenVerification = jwt.verify(token,process.env.JWT_SECRET); 
            req.userInformation = tokenVerification;
            next();   
        } catch (error) {
            res.status(400).json(
                {
                    success: false,
                    message: 'Por favor logueate de nuevo',
                    data: error.message,
                })
        }

    }

export 
{
    verifyJwtToken,
}