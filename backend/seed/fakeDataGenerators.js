import BeerPost from '../database/models/BeerPost.js';
import User from '../database/models/User.js';
import Brewery from '../database/models/Brewery.js';
import Image from '../database/models/Image.js';

import { createRequire } from 'module';
import randomstring from 'randomstring';
import Comment from '../database/models/Comment.js';
import ms from 'ms';

const require = createRequire(import.meta.url);
const breweryData = require('./beerAndBreweryData.json');
const userData = require('./userData.json');
const adminUserInfo = require('./adminUser.json');

export const createAdminUser = async () => {
   const adminUser = new User(adminUserInfo);
   await User.register(adminUser, `8cc2Phnfwaf9eoHtTZqM1PDqbaPTNs0VJoq0OTs8Ptr2Zl6UaOEZ79VkW5KGbO4u`);

   const displayImage = new Image({
      url: 'https://res.cloudinary.com/dxie9b7na/image/upload/v1643257136/BeerApp/CloudyCheerfulKakapo-size_restricted_xfyugt.gif',
      filename: `${randomstring.generate()}.gif`,
      uploadedBy: adminUser,
   });
   await displayImage.save();
   adminUser.profile.displayImage = displayImage;
   await adminUser.save();

   console.log(`Registered admin user: ${adminUser.username}`);
   return adminUser;
};

export const generateBeerPosts = async adminUser => {
   for (let brewery of breweryData) {
      const breweryPost = new Brewery({ postedBy: adminUser, ...brewery.info });
      await breweryPost.save();

      const headerImage = new Image({
         url: 'https://source.unsplash.com/random/?brewery&pub',
         filename: `${randomstring.generate()}.png`,
         uploadedBy: adminUser,
      });
      await headerImage.save();

      breweryPost.headerImage = headerImage;

      const image = new Image({
         url: 'https://source.unsplash.com/random/?brewery&pub',
         filename: `${randomstring.generate()}.png`,
         uploadedBy: adminUser,
      });

      await image.save();
      breweryPost.images = [image];
      await breweryPost.save();

      for (let beer of brewery.beers) {
         const { name, type, description, abv, ibu } = beer;

         const imageOne = new Image({
            url: 'https://source.unsplash.com/random/?beers',
            filename: `BiergartenApp/${randomstring.generate()}.png`,
            uploadedBy: adminUser,
         });
         const imageTwo = new Image({
            url: 'https://source.unsplash.com/random/?brewery',
            filename: `BiergartenApp/${randomstring.generate()}.png`,
            uploadedBy: adminUser,
         });
         const imageThree = new Image({
            url: 'https://source.unsplash.com/random/?bar',
            filename: `BiergartenApp/${randomstring.generate()}.png`,
            uploadedBy: adminUser,
         });

         await imageTwo.save();
         await imageOne.save();
         await imageThree.save();

         const post = new BeerPost({
            name,
            type,
            description,
            abv,
            ibu,
            beers: [],
            brewery: breweryPost,
            postedBy: adminUser,
            images: [imageOne, imageTwo, imageThree],
            comments: [],
         });

         breweryPost.beers.push(post);
         adminUser.posts.push(post);

         await post.save();
         await breweryPost.save();
         await adminUser.save();
         console.group();
         console.log(`${adminUser.username} just posted ${post.name} by ${breweryPost.name}`);
         console.groupEnd();
      }
   }
};

export const generateFakeUsers = async () => {
   for (let user of userData) {
      const { email, username, dateOfBirth, firstName, lastName, profile, password, image } = user;
      const userToRegister = new User({
         email,
         username,
         dateOfBirth,
         firstName,
         lastName,
         profile,
         isAccountConfirmed: true,
      });
      await User.register(userToRegister, password);
      const displayImage = new Image({
         url: 'https://source.unsplash.com/random/?beer&brewery',
         filename: `/${image.filename}.jpg`,
         createdTimestamp: image.createdTimestamp,
         uploadedBy: userToRegister,
      });
      await displayImage.save();

      userToRegister.profile.displayImage = displayImage;

      console.log(`\nRegistering user: ${userToRegister.username}`);

      console.group();

      for (let n = 0; n < 17; n++) {
         const allBeerPosts = await BeerPost.find();
         const randomBeerPost = allBeerPosts[Math.floor(Math.random() * allBeerPosts.length)];

         const isPostLikedByUser = userToRegister.profile.likes
            .map(objectID => objectID.toString())
            .includes(randomBeerPost._id.toString());

         const comment = new Comment({
            body: `Aerobic cask, bock craft adjunct ale stout Bacterial pint, final brewpub saccharification dopplebock hops fermenting back. Draught bacterial sour pitch Amber abv Autolysis final brewing, Alpha Adjunct fermenting conditioned hefe pump conditioning. Adjunct double dopplebock Beer infusion caramel copper Bottle, ale chocolate de glass Biere Abv carbonation ibu, tun malt lagering craft cider length. Double anaerobic tank garde tun pint units amber hoppy mouthfeel additive, rest real ibu scotch draft pitching bunghole conditioning. Heat tulip Amber back Barley exchanger priming, dextrin cider lager Biere ale, ester malt de lambic Bitter. Amber barleywine crystal Aau pub Barley rest carboy Aerobic Abbey units lagering keg, Anaerobic Bacterial lager tun ibu squares bunghole lambic cider wort glass bottom, filter Attenuation bright extract mouthfeel carbonation de adjunct abv length Autolysis. Fermentation infusion lagering fermenting wort Additive cider Berliner Becher hopping, bacterial barley Acidic scotch  mead stout trappist, Brew bottle aerobic goblet ale oxidized pitching beer.`,
            author: userToRegister,
            post: randomBeerPost,
            timestamp: Date.now() - Math.floor(Math.random() * ms('20 days')),
         });

         await comment.save();

         randomBeerPost.comments.push(comment);
         if (isPostLikedByUser) continue;
         userToRegister.profile.likes.push(randomBeerPost._id);

         randomBeerPost.likedBy.push(userToRegister._id);

         console.log(`${userToRegister.username} likes ${randomBeerPost.name}`);
         randomBeerPost.save();
      }
      console.groupEnd();

      await userToRegister.save();
   }
};
