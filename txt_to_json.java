//package txt_to_json;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;

public class txt_to_json {

    public static void main(String[] args) throws Exception {
        FileWriter fw = new FileWriter("alignment.json");
        BufferedWriter bw = new BufferedWriter(fw);

        String filePath = "";
        String defaultFileName = "fv04_t02_s";
        int fileCount = 87;
        String str = filePath + defaultFileName;

        String nstr, filename, filecontents;
        FileReader fr;
        BufferedReader br;
        bw.write("{\n");
        for (int i = 1; i <= fileCount; i++) {
            if (i < 10)
                filename = str + "0" + String.valueOf(i);
            else
                filename = str.concat(String.valueOf(i));
            fr = new FileReader(filename + ".txt");
            br = new BufferedReader(fr);
            filecontents = br.readLine();
            nstr = "    \"./datasets/woman/audio/" + filename + ".wav\": " + "\"" + filecontents + "\",\n";
            bw.write(nstr);
        }
        bw.write("}");
        bw.flush();
        bw.close();
    }
}