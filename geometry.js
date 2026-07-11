export const Geometry={
plate:(l,w,t)=>l*w*t,
flatBar:(l,w,t)=>l*w*t,
roundBar:(d,l)=>Math.PI*(d/2)**2*l,
squareBar:(w,l)=>w*w*l,
roundTube:(od,id,l)=>Math.PI*(((od/2)**2)-((id/2)**2))*l,
pipe:(od,wall,l)=>{const id=od-2*wall;return Math.PI*(((od/2)**2)-((id/2)**2))*l;},
hexBar:(af,l)=>((3*Math.sqrt(3))/8)*af*af*l,
hssSquare:(od,t,l)=>((od*od)-((od-2*t)**2))*l,
hssRectangle:(w,h,t,l)=>((w*h)-((w-2*t)*(h-2*t)))*l,
angle:(a,b,t,l)=>((a*t)+(b*t)-(t*t))*l,
channel:(d,b,tw,tf,l)=>((d*tw)+(2*b*tf)-(2*tw*tf))*l,
iBeam:(d,b,tw,tf,l)=>((2*b*tf)+((d-2*tf)*tw))*l
};

export const calculateWeight=({volume,density,quantity=1})=>{
 const piece=volume*density;
 return {piece,total:piece*quantity};
};
