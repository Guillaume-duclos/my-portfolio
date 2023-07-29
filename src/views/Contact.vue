<template>
  <PageContent>
    <aside v-if="showTitle" class="title" ref="container">
      <div>
        <div>
          <h2>
            <span v-for="(title, index) in titles" :key="`title-${index}`" class="titles-container">
              <span class="titles-sub-container">
                <span v-for="(word, index) in title" :key="`word-${index}`" class="words-container">
                  {{ word }}
                </span>
              </span>
            </span>
          </h2>
        </div>
      </div>
    </aside>

    <main class="content">
      <div class="content-lists-container" ref="content">
        <div>
          <p v-if="showTitle" class="content-title">Contact</p>
          <ul>
            <Item
              title="Mes coordonnées"
              subTitle="Consultez mes coordonnées ainsi que mes liens Github, ..."
              :enableViewExtend="false"
              :isOpen="true">
              <ul class="content-list">
                <li><span class="content-list-title">Tel : </span>(438)-529-2542</li>
                <li><span class="content-list-title">Mail : </span>guillaume-duclos@hotmail.fr</li>
                <li><span class="content-list-title">Ville : </span>Montréal, QC</li>
              </ul>

              <ul class="content-list">
                <li>
                  <img src="../assets/icons/github.svg" alt="Lien github" />
                  <a href="https://github.com/guillaume-duclos" target="_blank">
                    github.com/guillaume-duclos
                  </a>
                </li>
                <li>
                  <img src="../assets/icons/twitter.svg" alt="Lien twitter" />
                  <a href="https://twitter.com/GuillaumeDcl" target="_blank">
                    twitter.com/GuillaumeDcl
                  </a>
                </li>
                <li>
                  <img src="../assets/icons/linkedin.svg" alt="Lien linkedin" />
                  <a href="https://linkedin.com/in/duclos-guillaume" target="_blank">
                    linkedin.com/in/duclos-guillaume
                  </a>
                </li>
              </ul>
            </Item>
            <Item
              title="M'écrire"
              subTitle="Laissez moi un message que je pourrais lire plus tard"
              :enableViewExtend="false">
              <form class="content-form" ref="contactForm" @submit.prevent="sendEmail">
                <div class="content-input-container">
                  <label>Email : *</label>
                  <input type="email" name="user_email" placeholder="john.doe@mail.com" required />
                </div>

                <div class="content-input-container">
                  <label>Célulaire :</label>
                  <input type="tel" name="user_number" placeholder="+1 (000)-000-0000" />
                </div>

                <div class="content-input-container">
                  <label>Objet : *</label>
                  <input
                    type="text"
                    name="user_message_object"
                    placeholder="Que me vaut ce plaisir ?"
                    required />
                </div>

                <div class="content-input-container">
                  <label>Message : *</label>
                  <textarea placeholder="Votre message ici..." name="user_message" required />
                </div>

                <input type="submit" :value="emailStatus" />
              </form>
            </Item>
            <!--            <Item-->
            <!--              title="Me laisser un vocale"-->
            <!--              subTitle="Laissez moi un message que je pourrais écouter plus tard"-->
            <!--              :enableViewExtend="false">-->
            <!--              <div class="record-container">-->
            <!--                <button-->
            <!--                  class="record-button"-->
            <!--                  :class="{ 'record-active': isRecording }"-->
            <!--                  @click="isRecording ? stopRecording() : startRecording()">-->
            <!--                  <span />-->
            <!--                </button>-->

            <!--                <p class="record-time" ref="recordTime" />-->

            <!--                <audio controls class="audio-reader" ref="audioReader" />-->
            <!--              </div>-->
            <!--            </Item>-->
          </ul>
        </div>
      </div>

      <Navigation
        :previousPage="{ label: 'Stack', name: 'Stack' }"
        :nextPage="{ label: 'Accueil', name: 'Home' }" />
    </main>
  </PageContent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import emailJs from '@emailjs/browser';
import Item from '../components/Item.vue';
import Navigation from '../components/Navigation.vue';
import PageContent from '../components/PageContent.vue';
import Stack from '../data/stack.json';

const props = defineProps({
  pageLoaded: Array<String>,
});

const emit = defineEmits(['updatePageLoaded']);
const route = useRoute();

const contactForm = ref();
const emailStatus = ref('Envoyer');
const titles = ref([
  ['contact', '', ''],
  ['', '', ''],
  ['', '', ''],
]);
const showTitle = useMediaQuery('(min-width: 760px)');

// const audioRecordStartTime = ref<any>();
// const isRecording = ref(false);
// const audioReader = ref();
// const recordTime = ref();
// const maximumRecordingTimeInHours = 1;
// let elapsedTimeTimer: number;

onMounted(() => {
  gsap.registerPlugin(CustomEase);
  CustomEase.create('appearEase', '.56, .08, .24, 1');

  if (!props.pageLoaded.includes(route.name)) {
    gsap.set(`.titles-sub-container`, {
      marginTop: 66 + 3,
    });

    gsap.to(`.titles-sub-container`, {
      marginTop: 0,
      duration: 0.8,
      ease: 'appearEase',
    });

    // On indique que la page a été chargée
    emit('updatePageLoaded', { name: route.name });
  }
});

// Envoie du message écrit
const sendEmail = async () => {
  emailStatus.value = 'Envoie en cours';

  emailJs
    .sendForm(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      contactForm.value,
      import.meta.env.VITE_EMAIL_PUBLIC_KEY
    )
    .then(
      () => {
        emailStatus.value = 'Votre message a été envoyé';
      },
      () => {
        emailStatus.value = "Un problème est apparue pendant l'envoie du message";
      }
    );
};

// Audio recorder
// const audioRecorder = {
//   /** Stores the recorded audio as Blob objects of audio data as the recording continues*/
//   audioBlobs: [],
//
//   /** Stores the reference of the MediaRecorder instance that handles the MediaStream when recording starts*/
//   mediaRecorder: null,
//
//   /** Stores the reference to the stream currently capturing the audio*/
//   streamBeingCaptured: null,
//
//   /** Start recording the audio
//    * @returns {Promise} - returns a promise that resolves if audio recording successfully started
//    */
//   start: function () {
//     if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
//       // Feature is not supported in browser
//       // Return a custom error
//       return Promise.reject(
//         new Error('mediaDevices API or getUserMedia method is not supported in this browser.')
//       );
//     } else {
//       // Feature is supported in browser
//
//       // Create an audio stream
//       return (
//         navigator.mediaDevices
//           .getUserMedia({ audio: true })
//           //returns a promise that resolves to the audio stream
//           .then((stream) => {
//             //save the reference of the stream to be able to stop it when necessary
//             audioRecorder.streamBeingCaptured = stream;
//
//             //create a media recorder instance by passing that stream into the MediaRecorder constructor
//             audioRecorder.mediaRecorder = new MediaRecorder(stream);
//
//             //clear previously saved audio Blobs, if any
//             audioRecorder.audioBlobs = [];
//
//             //add a dataavailable event listener in order to store the audio data Blobs when recording
//             audioRecorder.mediaRecorder.addEventListener('dataavailable', (event) => {
//               audioRecorder.audioBlobs.push(event.data);
//             });
//
//             //start the recording by calling the start method on the media recorder
//             audioRecorder.mediaRecorder.start();
//           })
//       );
//     }
//   },
//
//   /** Stop the started audio recording
//    * @returns {Promise} - returns a promise that resolves to the audio as a blob file
//    */
//   stop: function () {
//     //return a promise that would return the blob or URL of the recording
//     return new Promise((resolve) => {
//       //save audio type to pass to set the Blob type
//       let mimeType = audioRecorder.mediaRecorder.mimeType;
//
//       //listen to the stop event in order to create & return a single Blob object
//       audioRecorder.mediaRecorder.addEventListener('stop', () => {
//         //create a single blob object, as we might have gathered a few Blob objects that needs to be joined as one
//         let audioBlob = new Blob(audioRecorder.audioBlobs, { type: mimeType });
//
//         //resolve promise with the single audio blob representing the recorded audio
//         resolve(audioBlob);
//       });
//
//       audioRecorder.cancel();
//     });
//   },
//
//   /** Cancel audio recording*/
//   cancel: function () {
//     //stop the recording feature
//     audioRecorder.mediaRecorder.stop();
//
//     //stop all the tracks on the active stream in order to stop the stream
//     audioRecorder.stopStream();
//
//     //reset API properties for next recording
//     audioRecorder.resetRecordingProperties();
//   },
//
//   /** Stop all the tracks on the active stream in order to stop the stream and remove
//    * the red flashing dot showing in the tab
//    */
//   stopStream: function () {
//     //stopping the capturing request by stopping all the tracks on the active stream
//     audioRecorder.streamBeingCaptured.getTracks().forEach((track) => track.stop());
//   },
//
//   /** Reset all the recording properties including the media recorder and stream being captured*/
//   resetRecordingProperties: function () {
//     audioRecorder.mediaRecorder = null;
//     audioRecorder.streamBeingCaptured = null;
//   },
// };

// Enregistrement d'un vocale
// const startRecording = () => {
//   console.log('startAudioRecording');
//
//   isRecording.value = true;
//
//   // If a previous audio recording is playing, pause it
//   // let recorderAudioIsPlaying = !audioElement.paused; // the paused property tells whether the media element is paused or not
//
//   // if (recorderAudioIsPlaying) {
//   //   audioElement.pause();
//   //   //also hide the audio playing indicator displayed on the screen
//   //   hideTextIndicatorOfAudioPlaying();
//   // }
//
//   //start recording using the audio recording API
//   audioRecorder
//     .start()
//     .then(() => {
//       audioRecordStartTime.value = new Date();
//       handleElapsedRecordingTime();
//     })
//     .catch((error) => {
//       if (error.message.includes('mediaDevices API is not supported in this browser.')) {
//         console.log('To record audio, use browsers like Chrome and Firefox.');
//       }
//
//       // Error handling structure
//       switch (error.name) {
//         case 'AbortError':
//           console.log('An AbortError has occurred.');
//           break;
//         case 'NotAllowedError':
//           console.log('A NotAllowedError has occurred. User might have denied permission.');
//           break;
//         case 'NotFoundError':
//           console.log('A NotFoundError has occurred.');
//           break;
//         case 'NotReadableError':
//           console.log('A NotReadableError has occurred.');
//           break;
//         case 'SecurityError':
//           console.log('A SecurityError has occurred.');
//           break;
//         case 'TypeError':
//           console.log('A TypeError has occurred.');
//           break;
//         case 'InvalidStateError':
//           console.log('An InvalidStateError has occurred.');
//           break;
//         case 'UnknownError':
//           console.log('An UnknownError has occurred.');
//           break;
//         default:
//           console.log('An error occurred with the error name ' + error.name);
//       }
//     });
// };

// Stop l'enregistrement
// const stopRecording = () => {
//   console.log('stopRecording');
//
//   isRecording.value = false;
//
//   //stop the recording using the audio recording API
//   audioRecorder
//     .stop()
//     .then((audioAsBlob) => {
//       playAudio(audioAsBlob);
//     })
//     .catch((error) => {
//       switch (error.name) {
//         case 'InvalidStateError':
//           console.log('An InvalidStateError has occurred.');
//           break;
//         default:
//           console.log('An error occurred with the error name ' + error.name);
//       }
//     });
// };

// Annulation de l'enregistrement
// const cancelRecording = () => {
//   console.log('cancelRecording');
//   audioRecorder.cancel();
// };

// const playAudio = (recorderAsBlob) => {
//   let reader = new FileReader();
//
//   // once content has been read
//   reader.onload = (event) => {
//     let base64URL = event.target.result;
//
//     // If this is the first audio playing, create a source element
//     // as pre populating the HTML with a source of empty src causes error
//     if (!audioReader.value.source) {
//       // if its not defined create it (happens first time only)
//       // createSourceForAudioElement();
//
//       // set the audio element's source using the base64 URL
//
//       audioReader.value.src = base64URL;
//     }
//
//     //set the type of the audio element based on the recorded audio's Blob type
//     if (recorderAsBlob.type.includes(';')) {
//       audioReader.value.type = recorderAsBlob.type.substring(0, recorderAsBlob.type.indexOf(';'));
//     } else {
//       audioReader.value.type = recorderAsBlob.type;
//     }
//
//     audioReader.value.load();
//
//     audioReader.value.play();
//   };
//
//   reader.readAsDataURL(recorderAsBlob);
// };

// const handleElapsedRecordingTime = () => {
//   displayElapsedTimeDuringAudioRecording('00:00');
//
//   elapsedTimeTimer = setInterval(() => {
//     let elapsedTime = computeElapsedTime(audioRecordStartTime);
//     displayElapsedTimeDuringAudioRecording(elapsedTime);
//   }, 1000);
// };

// const displayElapsedTimeDuringAudioRecording = (elapsedTime) => {
//   recordTime.value.innerHTML = elapsedTime;
//
//   // 2. Stop the recording when the max number of hours is reached
//   if (elapsedTimeReachedMaximumNumberOfHours(elapsedTime)) {
//     stopRecording();
//   }
// };

// const elapsedTimeReachedMaximumNumberOfHours = (elapsedTime) => {
//   // Split the elapsed time by the symbo :
//   let elapsedTimeSplitted = elapsedTime.split(':');
//
//   // Turn the maximum recording time in hours to a string and pad it with zero if less than 10
//   let maximumRecordingTimeInHoursAsString =
//     maximumRecordingTimeInHours < 10
//       ? '0' + maximumRecordingTimeInHours
//       : maximumRecordingTimeInHours.toString();
//
//   // if it the elapsed time reach hours and also reach the maximum recording time in hours return true
//   return (
//     elapsedTimeSplitted.length === 3 &&
//     elapsedTimeSplitted[0] === maximumRecordingTimeInHoursAsString
//   );
// };

// const computeElapsedTime = (startTime) => {
//   // record end time
//   let endTime = new Date();
//
//   // time difference in ms
//   let timeDiff = endTime - startTime;
//
//   // convert time difference from ms to seconds
//   timeDiff = timeDiff / 1000;
//
//   // extract integer seconds that dont form a minute using %
//   let seconds: string | number = Math.floor(timeDiff % 60); //ignoring uncomplete seconds (floor)
//
//   // pad seconds with a zero if neccessary
//   seconds = seconds < 10 ? '0' + seconds : seconds;
//
//   // convert time difference from seconds to minutes using %
//   timeDiff = Math.floor(timeDiff / 60);
//
//   // extract integer minutes that don't form an hour using %
//   let minutes: string | number = timeDiff % 60; //no need to floor possible incomplete minutes, becase they've been handled as seconds
//   minutes = minutes < 10 ? '0' + minutes : minutes;
//
//   // convert time difference from minutes to hours
//   timeDiff = Math.floor(timeDiff / 60);
//
//   // extract integer hours that don't form a day using %
//   let hours = timeDiff % 24; //no need to floor possible incomplete hours, becase they've been handled as seconds
//
//   // convert time difference from hours to days
//   timeDiff = Math.floor(timeDiff / 24);
//
//   // the rest of timeDiff is number of days
//   let days = timeDiff; //add days to hours
//
//   let totalHours: string | number = hours + days * 24;
//   totalHours = totalHours < 10 ? '0' + totalHours : totalHours;
//
//   if (totalHours === '00') {
//     return minutes + ':' + seconds;
//   } else {
//     return totalHours + ':' + minutes + ':' + seconds;
//   }
// };
</script>

<style scoped lang="postcss">
.content-list {
  margin: 26px 0 0 0 !important;

  &:first-of-type {
    margin-top: 0 !important;
  }

  &:last-of-type {
    padding-bottom: 26px !important;
  }

  &:not(:first-of-type) {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  &:not(:last-of-type) {
    li:last-of-type {
      /*margin-bottom: 20px;*/
    }
  }

  &:last-of-type {
    li:first-of-type {
      margin-top: 26px;
    }

    li:last-of-type {
      margin-bottom: 0;
    }
  }

  li {
    display: flex;
    grid-gap: 8px;
    margin: 10px 0;
    font-size: 14px;

    .content-list-title {
      font-weight: 600;
    }

    img {
      width: 18px;
    }

    a {
      color: #000000;
      text-decoration: none;
    }
  }
}

.content-form {
  margin-top: 26px;

  .content-input-container {
    display: flex;
    flex-direction: column;

    &:not(:first-of-type) label {
      margin-top: 20px;
    }

    label {
      display: flex;
      flex-direction: column;
      font-size: 14px;
      font-weight: 500;
    }

    input,
    textarea {
      padding: 0 10px 0 0;
      background: transparent;
      color: #000000;
      border: 0;
      outline: none;
      font-size: 18px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      &::placeholder {
        color: rgba(0, 0, 0, 0.2);
      }
    }

    input[required] + label:after {
      content: ' *';
      display: contents;
    }

    input {
      height: 40px;

      &:-webkit-autofill {
        -webkit-text-fill-color: #000000;
        box-shadow: 0 0 0 50px white inset;
        background-color: transparent;
      }
    }

    textarea {
      padding: 8px 0;
      height: 150px;
      resize: none;
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    }
  }

  input[type='submit'] {
    margin-top: 40px;
    width: 100%;
    height: 40px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
    color: #ffffff;
    text-transform: uppercase;
    background-color: #000000;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  }
}

.record-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 26px;
  border: 1px solid black;

  .record-button {
    width: 50px;
    height: 50px;
    border: 3px solid #000000;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;

    span {
      display: block;
      width: 20px;
      height: 20px;
      margin: auto;
      background-color: #000000;
      border-radius: 50%;
      animation: circleAnimation 0.3s ease-in-out;
    }

    &.record-active {
      span {
        border-radius: 15%;
        animation: squareAnimation 0.3s ease-in-out;
      }
    }

    .audio-reader {
      margin-top: 50px;
    }
  }
}

@keyframes squareAnimation {
  0% {
    border-radius: 50%;
  }

  100% {
    border-radius: 15%;
  }
}

@keyframes circleAnimation {
  0% {
    border-radius: 15%;
  }

  100% {
    border-radius: 50%;
  }
}
</style>
