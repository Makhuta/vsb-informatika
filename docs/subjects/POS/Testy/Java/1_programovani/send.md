---
sidebar_position: 1
title: Send
---

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;


public class MessageSender implements Runnable {
    private static String HOSTNAME = "feib425t.vsb.cz";
    private static int PORT = 8000;
    private Thread thread;

    public void start() {
        thread = new Thread(this);
        thread.start();
    }

    @Override
    public void run() {
        try {
            Socket s = new Socket(HOSTNAME, PORT);

            BufferedReader sis = new BufferedReader(new InputStreamReader(System.in));
            BufferedWriter os = new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));

            String line;

            do {
                System.out.println("Type message to send to server.");

                line=sis.readLine();
                if(!line.startsWith("exit")) {
                    os.write(line);
                    os.newLine();
                    os.flush();
                }
            } while (!line.equals("exit") && !line.equals("down"));

            s.close();
        } catch (IOException e) {
            throw new RuntimeException("Unable to connect to server!", e);
        };
    }

    public void stop() {
        if(thread != null) {
            thread.interrupt();
        }
    }
}
```