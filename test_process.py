import time
import logging

import os
import signal

import argparse

class TestProcess:
    PRINT_LIST = ["1", "2", "3"]

    def __init__(self, log_file=None):
        logging.basicConfig(level=logging.INFO, format='%(message)s')
        self.logger = logging.getLogger("TestPRocess")
        self.log_file = log_file

        if log_file:
            self.log_handler = logging.FileHandler(self.log_file)
            self.logger.addHandler(self.log_handler)

        self.__stop = False

        signal.signal(signal.SIGINT, self.stop)
        signal.signal(signal.SIGTERM, self.stop)

    def main(self):
        i = 0
        self.logger.info("Start running, PID: {0}".format(os.getpid()))
        while not self.__stop:
            self.logger.info(self.PRINT_LIST[i % len(self.PRINT_LIST)])
            i += 1
            time.sleep(1)

    def stop(self, signum, frame):
        self.__stop = True
        self.logger.info("Received a signal: {0}".format(signum))
        self.logger.info("Stop running")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--log", help="log filename", default=None)
    args = parser.parse_args()

    test_process = TestProcess(args.log)
    test_process.main()