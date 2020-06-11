package com.example.cdp2;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.media.MediaPlayer.OnCompletionListener;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.app.ActivityCompat;

public class MainActivity extends Activity implements View.OnClickListener, OnCompletionListener
{

    // 미리 상수 선언
    private static final int REC_STOP = 0;
    private static final int RECORDING = 1;
    private static final int PLAY_STOP = 0;
    private static final int PLAYING = 1;
    private static final int PLAY_PAUSE = 2;

    private MediaRecorder mRecorder = null;
    private MediaPlayer mPlayer = null;
    private int mRecState = REC_STOP;
    private int mPlayerState = PLAY_STOP;
    private SeekBar mRecProgressBar, mPlayProgressBar;
    private Button mBtnStartRec, mBtnStartPlay, mBtnStopPlay;
    private String mFilePath, mFileName = null;
    private TextView mTvPlayMaxPoint;

    private int mCurRecTimeMs = 0;
    private int mCurProgressTimeDisplay = 0;

    // 녹음시 SeekBar처리
    Handler mProgressHandler = new Handler()
    {
        public void handleMessage(Message msg)
        {
            mCurRecTimeMs = mCurRecTimeMs + 100;
            mCurProgressTimeDisplay = mCurProgressTimeDisplay + 100;

            // 녹음시간이 음수이면 정지버튼을 눌러 정지시켰음을 의미하므로
            // SeekBar는 그대로 정지시키고 레코더를 정지시킨다.
            if (mCurRecTimeMs < 0)
            {}
            // 녹음시간이 아직 최대녹음제한시간보다 작으면 녹음중이라는 의미이므로
            // SeekBar의 위치를 옮겨주고 0.1초 후에 다시 체크하도록 한다.
            else if (mCurRecTimeMs < 20000)
            {
                mRecProgressBar.setProgress(mCurProgressTimeDisplay);
                mProgressHandler.sendEmptyMessageDelayed(0, 100);
            }
            // 녹음시간이 최대 녹음제한 시간보다 크면 녹음을 정지 시킨다.
            else
            {
                mBtnStartRecOnClick();
            }
        }
    };

    // 재생시 SeekBar 처리
    Handler mProgressHandler2 = new Handler()
    {
        public void handleMessage(Message msg)
        {
            if (mPlayer == null) return;

            try
            {
                if (mPlayer.isPlaying())
                {
                    mPlayProgressBar.setProgress(mPlayer.getCurrentPosition());
                    mProgressHandler2.sendEmptyMessageDelayed(0, 100);
                }
            }
            catch (IllegalStateException e)
            {}
            catch (Exception e)
            {}
        }
    };

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED
                || ActivityCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.WRITE_EXTERNAL_STORAGE) !=
                PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(MainActivity.this, new String[] {Manifest.permission.RECORD_AUDIO,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE}, 0);
        }

        // 미디어 레코더 저장할 파일 생성
        mFilePath = "/sdcard/Download/Record";
        File dir = new File(mFilePath);
        if (!dir.exists())
            dir.mkdirs();

        // 파일명을 년도월일시간분초 로 생성 겹치는 상황 없애기
        SimpleDateFormat timeStampFormat = new SimpleDateFormat(
                "yyyyMMddHHmmss");

        // 파일명 위에서 정한 파일명을 WJ 폴더에 저장
        mFileName = timeStampFormat.format(new Date()).toString()
                + "Rec.mp4";

        mBtnStartRec = (Button) findViewById(R.id.btnStartRec);
        mBtnStartPlay = (Button) findViewById(R.id.btnStartPlay);
        mBtnStopPlay = (Button) findViewById(R.id.btnStopPlay);
        mRecProgressBar = (SeekBar) findViewById(R.id.recProgressBar);
        mPlayProgressBar = (SeekBar) findViewById(R.id.playProgressBar);
        mTvPlayMaxPoint = (TextView) findViewById(R.id.tvPlayMaxPoint);

        mBtnStartRec.setOnClickListener(this);
        mBtnStartPlay.setOnClickListener(this);
        mBtnStopPlay.setOnClickListener(this);
    }

    // 버튼의 OnClick 이벤트 리스너
    public void onClick(View v)
    {
        switch(v.getId())
        {
            case R.id.btnStartRec:
                mBtnStartRecOnClick();
                break;
            case R.id.btnStartPlay:
                mBtnStartPlayOnClick();
                break;
            case R.id.btnStopPlay:
                mBtnStopPlayOnClick();
                break;
            default:
                break;
        }
    }

    private void mBtnStartRecOnClick()
    {
        if (mRecState == REC_STOP)
        {
            mRecState = RECORDING;
            startRec();
            updateUI();
        }
        else if (mRecState == RECORDING)
        {
            mRecState = REC_STOP;
            stopRec();
            updateUI();
        }
    }

    // 녹음시작
    private void startRec()
    {
        mCurRecTimeMs = 0;
        mCurProgressTimeDisplay = 0;

        // SeekBar의 상태를 0.1초후 체크 시작
        mProgressHandler.sendEmptyMessageDelayed(0, 100);

        if (mRecorder == null)
        {
            mRecorder = new MediaRecorder();
            mRecorder.reset();
        }
        else
        {
            mRecorder.reset();
        }

        try
        {

            //오디오 파일 생성
            mRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            mRecorder.setOutputFormat(MediaRecorder.OutputFormat.RAW_AMR);
            mRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.DEFAULT);
            mRecorder.setOutputFile(mFilePath + mFileName);
            mRecorder.prepare();
            mRecorder.start();
        }
        catch (IllegalStateException e)
        {
            Toast.makeText(this, "IllegalStateException", Toast.LENGTH_LONG).show();
        }
        catch (IOException e)
        {
            Toast.makeText(this, "IOException", Toast.LENGTH_LONG).show();
        }
    }

    // 녹음정지
    private void stopRec()
    {
        try
        {
            mRecorder.stop();
        }
        catch(Exception e){

        }
        finally
        {
            mRecorder.release();
            mRecorder = null;
        }

        mCurRecTimeMs = -999;
        // SeekBar의 상태를 즉시 체크
        mProgressHandler.sendEmptyMessageDelayed(0, 0);
    }

    private void mBtnStartPlayOnClick()
    {
        if (mPlayerState == PLAY_STOP)
        {
            mPlayerState = PLAYING;
            initMediaPlayer();
            startPlay();
            updateUI();
        }
        else if (mPlayerState == PLAYING)
        {
            mPlayerState = PLAY_PAUSE;
            pausePlay();
            updateUI();
        }
        else if (mPlayerState == PLAY_PAUSE)
        {
            mPlayerState = PLAYING;
            startPlay();
            updateUI();
        }
    }
    private void mBtnStopPlayOnClick()
    {
        if (mPlayerState == PLAYING || mPlayerState == PLAY_PAUSE)
        {
            mPlayerState = PLAY_STOP;
            stopPlay();
            releaseMediaPlayer();
            updateUI();
        }
    }

    private void initMediaPlayer()
    {
        // 미디어 플레이어 생성
        if (mPlayer == null)
            mPlayer = new MediaPlayer();
        else
            mPlayer.reset();

        mPlayer.setOnCompletionListener(this);
        String fullFilePath = mFilePath + mFileName;

        try
        {
            mPlayer.setDataSource(fullFilePath);
            mPlayer.prepare();
            int point = mPlayer.getDuration();
            mPlayProgressBar.setMax(point);

            int maxMinPoint = point / 1000 / 60;
            int maxSecPoint = (point / 1000) % 60;
            String maxMinPointStr = "";
            String maxSecPointStr = "";

            if (maxMinPoint < 10)
                maxMinPointStr = "0" + maxMinPoint + ":";
            else
                maxMinPointStr = maxMinPoint + ":";

            if (maxSecPoint < 10)
                maxSecPointStr = "0" + maxSecPoint;
            else
                maxSecPointStr = String.valueOf(maxSecPoint);

            mTvPlayMaxPoint.setText(maxMinPointStr + maxSecPointStr);

            mPlayProgressBar.setProgress(0);
        }
        catch(Exception e)
        {
            Log.v("ProgressRecorder", "미디어 플레이어 Prepare Error ==========> " + e);
        }
    }

    // 재생 시작
    private void startPlay()
    {
        Log.v("ProgressRecorder", "startPlay().....");

        try
        {
            mPlayer.start();

            // SeekBar의 상태를 0.1초마다 체크
            mProgressHandler2.sendEmptyMessageDelayed(0, 100);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            Toast.makeText(this, "error : " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private void pausePlay()
    {
        Log.v("ProgressRecorder", "pausePlay().....");

        // 재생을 일시 정지하고
        mPlayer.pause();

        // 재생이 일시정지되면 즉시 SeekBar 메세지 핸들러를 호출한다.
        mProgressHandler2.sendEmptyMessageDelayed(0, 0);
    }

    private void stopPlay()
    {
        Log.v("ProgressRecorder", "stopPlay().....");

        // 재생을 중지하고
        mPlayer.stop();

        // 즉시 SeekBar 메세지 핸들러를 호출한다.
        mProgressHandler2.sendEmptyMessageDelayed(0, 0);
    }

    private void releaseMediaPlayer()
    {
        Log.v("ProgressRecorder", "releaseMediaPlayer().....");
        mPlayer.release();
        mPlayer = null;
        mPlayProgressBar.setProgress(0);
    }

    public void onCompletion(MediaPlayer mp)
    {
        mPlayerState = PLAY_STOP; // 재생이 종료됨

        // 재생이 종료되면 즉시 SeekBar 메세지 핸들러를 호출한다.
        mProgressHandler2.sendEmptyMessageDelayed(0, 0);

        updateUI();
    }

    private void updateUI()
    {
        if (mRecState == REC_STOP)
        {
            mBtnStartRec.setText("Rec");
            mRecProgressBar.setProgress(0);
        }
        else if (mRecState == RECORDING)
            mBtnStartRec.setText("Stop");

        if (mPlayerState == PLAY_STOP)
        {
            mBtnStartPlay.setText("Play");
            mPlayProgressBar.setProgress(0);
        }
        else if (mPlayerState == PLAYING)
            mBtnStartPlay.setText("Pause");
        else if (mPlayerState == PLAY_PAUSE)
            mBtnStartPlay.setText("Start");
    }
}