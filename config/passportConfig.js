import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";

passport.use(
    new LocalStrategy(
        {usernameField: "email"},
        async (email, password, done) =>{
            try{
                const user = await User.findOne({ email }).select("+password");
                if(!user){
                    return done(null, false, {message: "User not found"});
                }

                if(!user.isActive){
                    return done(null, false, {message: "This account has been deactivated"});
                }

                const isMatch = await user.comparePassword(password);
                if(!isMatch){
                    return done(null, false, {message: "Incorrect password"});
                }

                return done(null, user);
            }
            catch(err){
                return done(err);
            }
        }
    )
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) =>{
            try{
                const email = profile.emails[0].value;
                const avatar = profile.photos[0].value;

                 // Case 1: User has signed in with Google before — just return them
                let user = await User.findOne({ googleId: profile.id });
                if(user){
                    return done(null, user);
                }  
                
                // Case 2: Someone registered with email+password using this same email.
                //link googleid to this user
                user = await User.findOne({ email });
                if(user){
                    user.googleId = profile.id;
                    user.authProvider = "google";
                    if(!user.profile?.profilePicture){
                        user.profile = {...user.profile, profilePicture: avatar};
                    }
                    await user.save();
                    return done(null, user);
                }
                const baseUsername = profile.displayName
                .toLowerCase()
                .replace(/\s+/g, "")
                .replace(/[^a-zA-Z0-9]/g, "");

                const username = `${baseUsername}${profile.id.slice(-4)}`;

                const newUser = await User.create({
                    username,
                    email,
                    googleId: profile.id,
                    authProvider: "google",
                    isEmailVerified: true,
                    isMfaActive: false,
                    profile: {
                        fullName: profile.displayName,
                        profilePicture: avatar,
                    },
                });

                return done(null, newUser) ;

            }
            catch(err){
                return done(err);
            }
        }
    )
)

passport.serializeUser((user, done)=>{
    done(null, user._id);
})

passport.deserializeUser(async(id, done)=>{
    try{
        const user = await User.findById(id);
        done(null, user)
    }
    catch(err){
        done(err)
    }
});

export default passport;